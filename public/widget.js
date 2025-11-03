(function () {
  'use strict';
 
  // Get publish_key from script tag or data attribute
  function getPublishKey() {
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i].src && scripts[i].src.includes('widget.js')) {
        const url = new URL(scripts[i].src);
        return url.searchParams.get('publish_key') || scripts[i].getAttribute('data-publish-key');
      }
    }
    return null;
  }
 
  const publishKey = getPublishKey();
  if (!publishKey) {
    console.error('Webnotics Chatbot: publish_key not found');
    return;
  }
 
  const API_BASE = 'https://webnotics-chatbot.onrender.com';
  const STORAGE_KEY = `webnotics_chat_${publishKey}`;
  const USER_KEY = `webnotics_user_${publishKey}`;
 
  // Get or create user info
  function getUserInfo() {
    const stored = localStorage.getItem(USER_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return null;
      }
    }
    return null;
  }
 
  function saveUserInfo(userInfo) {
    localStorage.setItem(USER_KEY, JSON.stringify(userInfo));
  }
 
  // Get or create session ID
  function getSessionId() {
    let sessionId = sessionStorage.getItem('webnotics_session_id');
    if (!sessionId) {
      sessionId = 'sess_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('webnotics_session_id', sessionId);
    }
    return sessionId;
  }
 
  // Get chat history
  function getChatHistory() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return [];
      }
    }
    return [];
  }
 
  // Save chat message
  function saveChatMessage(message, isUser = true) {
    const history = getChatHistory();
    history.push({
      message,
      isUser,
      timestamp: new Date().toISOString()
    });
    // Keep last 100 messages
    if (history.length > 100) {
      history.shift();
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }
 
  // Fetch customization data
  let customization = null;
  let userInfo = getUserInfo();
  const sessionId = getSessionId();
  const DEFAULT_CUSTOMIZATION = {
    background_color: "#101828",
    primary_color: "#465fff",
    text_color: "#ffffff",
  };
  async function loadCustomization() {
    try {
      const res = await fetch(`${API_BASE}/widget-chatbot?publish_key=${encodeURIComponent(publishKey)}`);
      if (!res.ok) throw new Error('Failed to load customization');
      const data = await res.json();
      customization = { ...DEFAULT_CUSTOMIZATION, ...data };
      console.log('customization', customization);
      initChatbot();
    } catch (err) {
      customization = { ...DEFAULT_CUSTOMIZATION };
      console.error('Webnotics Chatbot: Failed to load customization', err);
    }
  }
 
  // Show user info form
  function showUserForm(callback) {
    const formOverlay = document.createElement('div');
    formOverlay.id = 'webnotics-form-overlay';
    formOverlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999998;
    `;
 
    const formBox = document.createElement('div');
    formBox.style.cssText = `
      background: ${customization?.background_color || '#FFFFFF'};
      color: ${customization?.text_color || '#000000'};
      padding: 24px;
      border-radius: 12px;
      max-width: 400px;
      width: 90%;
      font-family: ${customization?.font_family || 'Arial, sans-serif'};
    `;
 
    const title = document.createElement('h3');
    title.textContent = customization?.brand_name || 'Welcome';
    title.style.cssText = `margin: 0 0 16px 0; color: ${customization?.text_color || '#000000'};`;
 
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.placeholder = 'Your Name';
    nameInput.required = true;
    nameInput.style.cssText = `
      width: 100%;
      padding: 10px;
      margin-bottom: 12px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-family: ${customization?.font_family || 'Arial, sans-serif'};
    `;
 
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.placeholder = 'Your Email';
    emailInput.required = true;
    emailInput.style.cssText = `
      width: 100%;
      padding: 10px;
      margin-bottom: 16px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-family: ${customization?.font_family || 'Arial, sans-serif'};
    `;
 
    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Start Chat';
    submitBtn.style.cssText = `
      width: 100%;
      padding: 12px;
      background: ${customization?.primary_color || '#0000FF'};
      color: #FFFFFF;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-family: ${customization?.font_family || 'Arial, sans-serif'};
    `;
 
    submitBtn.onclick = (e) => {
      e.preventDefault();
      if (nameInput.value && emailInput.value) {
        const info = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim()
        };
        saveUserInfo(info);
        formOverlay.remove();
        callback(info);
      }
    };
 
    formBox.appendChild(title);
    formBox.appendChild(nameInput);
    formBox.appendChild(emailInput);
    formBox.appendChild(submitBtn);
    formOverlay.appendChild(formBox);
    document.body.appendChild(formOverlay);
    nameInput.focus();
  }
 
  // Initialize chatbot UI
  function initChatbot() {
    if (!customization) return;
    // Always create UI - don't show form on load
    createChatbotUI();
  }
 
  function createChatbotUI() {
    // Remove existing chatbot if any
    const existing = document.getElementById('webnotics-chatbot');
    if (existing) existing.remove();
 
    const chatbot = document.createElement('div');
    chatbot.id = 'webnotics-chatbot';
    chatbot.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 380px;
      max-height: 600px;
      background: ${customization.background_color};
      border-radius: 20px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
      display: flex;
      flex-direction: column;
      z-index: 999999;
      font-family: ${customization.font_family};
    `;
 
    // Header
    const header = document.createElement('div');
    header.style.cssText = `
      background: ${customization.primary_color};
      color: ${customization.text_color};
      padding: 16px;
      border-radius: 20px 20px 0 0;
      display: flex;
      align-items: center;
      gap: 12px;
    `;
 
    if (customization.logo_url) {
      const logo = document.createElement('img');
      logo.src = customization.logo_url;
      logo.alt = customization.brand_name;
      logo.style.cssText = 'width: 32px; height: 32px; border-radius: 50%; object-fit: cover;';
      header.appendChild(logo);
    }
 
    const brandName = document.createElement('span');
    brandName.textContent = customization.brand_name;
    brandName.style.cssText = `font-weight: bold; font-size: 20px;`;
    header.appendChild(brandName);
 
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
      margin-left: auto;
      background: none;
      border: none;
      color: ${customization.text_color};
      font-size: 30px;
      cursor: pointer;
      line-height: 1;
    `;
    closeBtn.onclick = () => toggleChatbot();
    header.appendChild(closeBtn);
 
    // Chat container
    const chatContainer = document.createElement('div');
    chatContainer.id = 'webnotics-chat-container';
    chatContainer.style.cssText = `
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      max-height: 400px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    `;
 
    // Load chat history only if user info exists (will be loaded in createChatbotUI)
 
    // Input area
    const inputArea = document.createElement('div');
    inputArea.style.cssText = `
      padding: 12px;
      border-top: 1px solid #ddd;
      display: flex;
      gap: 8px;
    `;
 
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Type your message...';
    input.id = 'webnotics-chat-input';
    input.style.cssText = `
      flex: 1;
      padding: 10px;
      border: 0;
      border-radius: 6px;
      background: transparent;
      color: ${customization.text_color};
      font-family: ${customization.font_family};
      outline: none;
    `;
 
    const sendBtn = document.createElement('button');
    sendBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em">
  <path fill="currentColor" d="m3.4 20.4l17.45-7.48a1 1 0 0 0 0-1.84L3.4 3.6a.993.993 0 0 0-1.39.91L2 9.12c0 .5.37.93.87.99L17 12L2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91"/>
</svg>`;
    sendBtn.style.cssText = `
      padding: 0;
      background: transparent;
      color: ${customization.text_color};
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-family: ${customization.font_family};
      font-size: 30px;
    `;
 
    sendBtn.onclick = () => {
      if (!userInfo) {
        showUserForm((info) => {
          userInfo = info;
          sendMessage();
        });
        return;
      }
      sendMessage();
    };
 
    input.onkeypress = (e) => {
      if (e.key === 'Enter') {
        if (!userInfo) {
          showUserForm((info) => {
            userInfo = info;
            sendMessage();
          });
          return;
        }
        sendMessage();
      }
    };
 
    inputArea.appendChild(input);
    inputArea.appendChild(sendBtn);
 
    chatbot.appendChild(header);
    chatbot.appendChild(chatContainer);
    chatbot.appendChild(inputArea);
 
    // Toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'webnotics-toggle';
    toggleBtn.innerHTML = '💬';
    toggleBtn.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: ${customization.primary_color};
      color: ${customization.text_color};
      border: none;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      z-index: 999998;
      display: none;
    `;
    toggleBtn.onclick = () => {
      // Check if user info exists before showing chatbot
      if (!userInfo) {
        showUserForm((info) => {
          userInfo = info;
          toggleChatbot();
        });
        return;
      }
      toggleChatbot();
    };
 
    document.body.appendChild(toggleBtn);
    document.body.appendChild(chatbot);
 
    chatbot.style.display = 'none';
    toggleBtn.style.display = 'block';
 
    // Load chat history only if user info exists
    if (userInfo) {
      const history = getChatHistory();
      if (history.length > 0) {
        history.forEach(msg => {
          const msgEl = createMessageElement(msg.message, msg.isUser);
          chatContainer.appendChild(msgEl);
        });
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }
  }
 
  function hexWithOpacity(hex, opacity = 0.7) {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
 
  function createMessageElement(message, isUser) {
    const msgEl = document.createElement('div');
    msgEl.style.cssText = `
      padding: 10px 14px;
      border-radius: 20px;
      max-width: 80%;
      word-wrap: break-word;
          line-height: 20px;
      ${isUser
        ? `background: ${customization.primary_color}; color: ${customization.text_color}; margin-left: auto;`
        : `background: ${hexWithOpacity(customization.primary_color, 0.5)}; color: ${customization.text_color};`
      }
    `;
 
    // For bot messages, render HTML; for user messages, escape HTML for security
    if (isUser) {
      msgEl.textContent = message;
    } else {
      // Create a temporary div to sanitize and render HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = message;
      // Only allow safe HTML tags
      const allowedTags = ['p', 'br', 'strong', 'em', 'b', 'i', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a'];
      const walker = document.createTreeWalker(tempDiv, NodeFilter.SHOW_ELEMENT);
      const nodesToRemove = [];
      let node;
      while (node = walker.nextNode()) {
        if (!allowedTags.includes(node.tagName.toLowerCase())) {
          nodesToRemove.push(node);
        } else if (node.tagName.toLowerCase() === 'a') {
          node.setAttribute('target', '_blank');
          node.setAttribute('rel', 'noopener noreferrer');
        }
      }
      nodesToRemove.forEach(n => n.replaceWith(...Array.from(n.childNodes)));
      msgEl.innerHTML = tempDiv.innerHTML;
    }
 
    return msgEl;
  }
 
  async function sendMessage() {
    const input = document.getElementById('webnotics-chat-input');
    const message = input.value.trim();
    if (!message || !userInfo) return;
 
    // Add user message to UI
    const chatContainer = document.getElementById('webnotics-chat-container');
    const userMsg = createMessageElement(message, true);
    chatContainer.appendChild(userMsg);
    saveChatMessage(message, true);
    chatContainer.scrollTop = chatContainer.scrollHeight;
 
    input.value = '';
    input.disabled = true;
 
    // Show typing indicator
    const typing = document.createElement('div');
    typing.textContent = 'Typing...';
    typing.style.cssText = `
      padding: 10px 14px;
      border-radius: 12px;
      background: rgba(255,255,255,0.1);
      color: ${customization.text_color};
      font-style: italic;
    `;
    chatContainer.appendChild(typing);
    chatContainer.scrollTop = chatContainer.scrollHeight;
 
    try {
      const response = await fetch(`${API_BASE}/chat?website_url=${encodeURIComponent(customization.website_url)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assistant_name: customization.brand_name,
          message: message,
          session_id: sessionId,
          user_email: userInfo.email,
          user_name: userInfo.name
        })
      });
 
      typing.remove();
 
      if (!response.ok) {
        throw new Error('Failed to get response');
      }
 
      const data = await response.json();
      const botMessage = data.message || data.response || 'Sorry, I could not process your request.';
 
      // Remove any existing messages at the end (in case of duplicates)
      const botMsg = createMessageElement(botMessage, false);
      chatContainer.appendChild(botMsg);
      saveChatMessage(botMessage, false);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    } catch (err) {
      typing.remove();
      const errorMsg = createMessageElement('Sorry, there was an error. Please try again.', false);
      chatContainer.appendChild(errorMsg);
      console.error('Webnotics Chatbot error:', err);
    }
 
    input.disabled = false;
    input.focus();
  }
 
  function toggleChatbot() {
    const chatbot = document.getElementById('webnotics-chatbot');
    const toggleBtn = document.getElementById('webnotics-toggle');
    if (chatbot && toggleBtn) {
      if (chatbot.style.display === 'none') {
        chatbot.style.display = 'flex';
        toggleBtn.style.display = 'none';
        // Refresh userInfo in case it was just set
        userInfo = getUserInfo();
        // Reload chat history if user info now exists
        const chatContainer = document.getElementById('webnotics-chat-container');
        if (chatContainer && userInfo) {
          const history = getChatHistory();
          chatContainer.innerHTML = '';
          if (history.length > 0) {
            history.forEach(msg => {
              const msgEl = createMessageElement(msg.message, msg.isUser);
              chatContainer.appendChild(msgEl);
            });
            chatContainer.scrollTop = chatContainer.scrollHeight;
          }
        }
      } else {
        chatbot.style.display = 'none';
        toggleBtn.style.display = 'block';
      }
    }
  }
 
  // Initialize
  loadCustomization();
})();