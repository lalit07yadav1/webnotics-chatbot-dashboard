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
 
  // Get IP address
  let cachedIpAddress = null;
  async function getIpAddress() {
    if (cachedIpAddress) return cachedIpAddress;
    try {
      // Try JSON format first
      try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (response.ok) {
          const data = await response.json();
          cachedIpAddress = data.ip;
          if (cachedIpAddress) {
            return cachedIpAddress;
          }
        }
      } catch (e) {
        // Fallback to text format
      }
      
      // Fallback: try text format
      try {
        const textResponse = await fetch('https://api.ipify.org?format=text');
        if (textResponse.ok) {
          cachedIpAddress = (await textResponse.text()).trim();
          if (cachedIpAddress) {
            return cachedIpAddress;
          }
        }
      } catch (e) {
        // Try alternative service
      }
      
      // Alternative service
      try {
        const altResponse = await fetch('https://api64.ipify.org?format=json');
        if (altResponse.ok) {
          const data = await altResponse.json();
          cachedIpAddress = data.ip;
          if (cachedIpAddress) {
            return cachedIpAddress;
          }
        }
      } catch (e) {
        // All services failed
      }
    } catch (err) {
      console.warn('Webnotics Chatbot: Failed to fetch IP address', err);
      return null;
    }
    return null;
  }

  // Fetch customization data
  let customization = null;
  let userInfo = getUserInfo();
  const sessionId = getSessionId();
  const DEFAULT_CUSTOMIZATION = {
    background_color: "#101828",
    primary_color: "#465fff",
    text_color: "#ffffff",
    font_family: "Arial, sans-serif",
    logo_url: "",
    brand_name: "AI assistant",
    bot_message_bg: "#1e293b",
    bot_message_bg_font_size: "16px",
    bot_message_bg_text_color: "#ffffff",
    bot_message_user_message: "Hello! Welcome! How can I help you today?",
    user_message_bg: "#465fff",
    user_message_bg_font_size: "16px",
    user_message_bg_text_color: "#ffffff",
    user_message_font_family: "Arial, sans-serif",
    header_bg: "#465fff",
    header_font_size: "18px",
    header_text_color: "#ffffff",
    header_font_family: "Arial, sans-serif",
    input_bg: "#0f172a",
    input_text_color: "#ffffff",
    input_placeholder_text: "Type your message...",
    input_placeholder_text_color: "#94a3b8",
    input_placeholder_font_family: "Arial, sans-serif",
    submit_button_bg: "#465fff",
    submit_button_color: "#ffffff",
    submit_button_font_family: "Arial, sans-serif"
  };
  // Load Google Fonts dynamically
  function loadGoogleFont(fontFamily) {
    if (!fontFamily) return;
    
    // Extract font name (remove fallbacks like "sans-serif", "serif", etc.)
    const fontName = fontFamily.split(',')[0].trim();
    
    // List of Google Fonts (most popular ones)
    const googleFonts = [
      'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins', 'Source Sans Pro', 'Raleway',
      'Ubuntu', 'Oswald', 'PT Sans', 'Droid Sans', 'Nunito', 'Inter', 'Work Sans', 'Fira Sans',
      'Noto Sans', 'Muli', 'Quicksand', 'Rubik', 'Cabin', 'Dosis', 'Josefin Sans', 'Libre Franklin',
      'Maven Pro', 'Nunito Sans', 'PT Sans Narrow', 'Titillium Web', 'Yanone Kaffeesatz', 'Barlow',
      'DM Sans', 'Manrope', 'Plus Jakarta Sans', 'Space Grotesk', 'Figtree', 'Outfit', 'Sora',
      'Merriweather', 'Playfair Display', 'Lora', 'Crimson Text', 'PT Serif', 'Source Serif Pro',
      'Libre Baskerville', 'Bitter', 'Noto Serif', 'Roboto Slab', 'Droid Serif', 'Arvo', 'Bree Serif',
      'Crete Round', 'Gentium Book Plus', 'Lusitana', 'Spectral', 'Vollkorn', 'Bebas Neue', 'Righteous',
      'Fredoka One', 'Lobster', 'Pacifico', 'Dancing Script', 'Satisfy', 'Kalam', 'Permanent Marker',
      'Shadows Into Light', 'Amatic SC', 'Bangers', 'Chewy', 'Comfortaa', 'Fugaz One', 'Indie Flower',
      'Luckiest Guy', 'Monoton', 'Orbitron', 'Russo One', 'Sigmar One', 'Titan One', 'Roboto Mono',
      'Source Code Pro', 'Fira Code', 'Fira Mono', 'Inconsolata', 'PT Mono', 'Space Mono', 'Courier Prime',
      'JetBrains Mono', 'IBM Plex Mono', 'Caveat', 'Caveat Brush', 'Gloria Hallelujah', 'Gochi Hand',
      'Handlee', 'Patrick Hand', 'Shadows Into Light Two'
    ];
    
    // Check if it's a Google Font
    if (googleFonts.includes(fontName)) {
      // Check if font is already loaded
      const fontId = `google-font-${fontName.replace(/\s+/g, '-').toLowerCase()}`;
      if (document.getElementById(fontId)) return;
      
      // Create link element to load Google Font
      const link = document.createElement('link');
      link.id = fontId;
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}:wght@400;500;600;700&display=swap`;
      document.head.appendChild(link);
    }
  }

  async function loadCustomization() {
    try {
      const res = await fetch(`${API_BASE}/widget-chatbot?publish_key=${encodeURIComponent(publishKey)}`);
      if (!res.ok) throw new Error('Failed to load customization');
      const data = await res.json();
      customization = { ...DEFAULT_CUSTOMIZATION, ...data };
      
      // Load Google Fonts for all font family fields
      loadGoogleFont(customization.font_family);
      loadGoogleFont(customization.header_font_family);
      loadGoogleFont(customization.user_message_font_family);
      loadGoogleFont(customization.input_placeholder_font_family);
      loadGoogleFont(customization.submit_button_font_family);
      
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
    title.style.cssText = `
      margin: 0 0 16px 0;
      color: ${customization?.header_text_color || customization?.text_color || '#000000'};
      font-family: ${customization?.header_font_family || customization?.font_family || 'Arial, sans-serif'};
      font-size: ${customization?.header_font_size || '18px'};
    `;
 
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
      margin-bottom: 12px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-family: ${customization?.font_family || 'Arial, sans-serif'};
    `;

    const phoneInput = document.createElement('input');
    phoneInput.type = 'tel';
    phoneInput.placeholder = 'Your Phone Number';
    phoneInput.required = true;
    phoneInput.style.cssText = `
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
      background: ${customization?.submit_button_bg || customization?.primary_color || '#0000FF'};
      color: ${customization?.submit_button_color || '#FFFFFF'};
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-family: ${customization?.submit_button_font_family || customization?.font_family || 'Arial, sans-serif'};
    `;
 
    submitBtn.onclick = (e) => {
      e.preventDefault();
      if (nameInput.value && emailInput.value && phoneInput.value) {
        const info = {
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          phone: phoneInput.value.trim()
        };
        saveUserInfo(info);
        formOverlay.remove();
        callback(info);
      }
    };

    formBox.appendChild(title);
    formBox.appendChild(nameInput);
    formBox.appendChild(emailInput);
    formBox.appendChild(phoneInput);
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
      background: ${customization.header_bg};
      color: ${customization.header_text_color};
      padding: 16px;
      border-radius: 20px 20px 0 0;
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: ${customization.header_font_family};
    `;

    // Create icon container
    const iconContainer = document.createElement('div');
    iconContainer.style.cssText = 'width: 40px; height: 40px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;';

    if (customization.logo_url && customization.logo_url.trim()) {
      const logo = document.createElement('img');
      logo.src = customization.logo_url;
      logo.alt = customization.brand_name || 'AI assistant';
      logo.style.cssText = 'width: 40px; height: 40px; border-radius: 50%; object-fit: cover; display: block;';
      logo.onerror = function() {
        // If logo fails to load, show bot icon instead
        iconContainer.innerHTML = `
          <svg width="40" height="40" viewBox="0 0 24 24" fill="${customization.header_text_color}" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"/>
            <circle cx="8.5" cy="10.5" r="1.5" fill="${customization.header_text_color}"/>
            <circle cx="15.5" cy="10.5" r="1.5" fill="${customization.header_text_color}"/>
            <path d="M12 15.5C10.07 15.5 8.5 14.43 8.5 13H15.5C15.5 14.43 13.93 15.5 12 15.5Z"/>
          </svg>
        `;
      };
      iconContainer.appendChild(logo);
    } else {
      // Show bot icon when no logo URL
      iconContainer.innerHTML = `
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H11V21H5V3H13V9H21ZM14 10V12H22V10H14ZM14 14V16H22V14H14ZM14 18V20H19V18H14Z" fill="${customization.header_text_color}"/>
          <circle cx="9" cy="9" r="2" fill="${customization.header_text_color}"/>
          <path d="M9 13C10.1 13 11 13.9 11 15V17H7V15C7 13.9 7.9 13 9 13Z" fill="${customization.header_text_color}"/>
        </svg>
      `;
    }
    header.appendChild(iconContainer);
 
    const brandName = document.createElement('span');
    brandName.textContent = customization.brand_name || 'AI assistant';
    brandName.style.cssText = `
      font-weight: bold;
      font-size: ${customization.header_font_size};
      font-family: ${customization.header_font_family};
      color: ${customization.header_text_color};
      flex: 1;
    `;
    header.appendChild(brandName);
 
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = `
      margin-left: auto;
      background: none;
      border: none;
      color: ${customization.header_text_color};
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
      font-family: ${customization.font_family};
    `;
 
    // Load chat history only if user info exists (will be loaded in createChatbotUI)
 
    // Input area
    const inputArea = document.createElement('div');
    inputArea.style.cssText = `
      padding: 12px 16px;
      border-top: 1px solid ${hexWithOpacity(customization.input_text_color, 0.15)};
      display: flex;
      gap: 10px;
      align-items: center;
      background: ${customization.input_bg};
    `;

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = customization.input_placeholder_text || 'Type your message...';
    input.id = 'webnotics-chat-input';
    input.style.cssText = `
      flex: 1;
      padding: 12px 16px;
      border: 1px solid ${hexWithOpacity(customization.input_text_color, 0.2)};
      border-radius: 24px;
      background: ${customization.input_bg};
      color: ${customization.input_text_color};
      font-family: ${customization.input_placeholder_font_family || customization.font_family};
      font-size: 14px;
      outline: none;
      min-width: 0;
    `;

    const placeholderStyleId = `webnotics-placeholder-style-${publishKey}`;
    let placeholderStyle = document.getElementById(placeholderStyleId);
    if (!placeholderStyle) {
      placeholderStyle = document.createElement('style');
      placeholderStyle.id = placeholderStyleId;
      document.head.appendChild(placeholderStyle);
    }
    placeholderStyle.textContent = `
      #webnotics-chat-input::placeholder {
        color: ${customization.input_placeholder_text_color};
        font-family: ${customization.input_placeholder_font_family || customization.font_family};
        opacity: 0.7;
      }
    `;

    const sendBtn = document.createElement('button');
    sendBtn.textContent = 'Send';
    sendBtn.style.cssText = `
      padding: 12px 24px;
      background: ${customization.submit_button_bg};
      color: ${customization.submit_button_color};
      border: none;
      border-radius: 24px;
      cursor: pointer;
      font-family: ${customization.submit_button_font_family || customization.font_family};
      font-size: 14px;
      font-weight: 600;
      white-space: nowrap;
      height: 44px;
      flex-shrink: 0;
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
      background: ${customization.submit_button_bg};
      color: ${customization.submit_button_color};
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
      } else if (customization.bot_message_user_message) {
        const welcome = createMessageElement(customization.bot_message_user_message, false);
        chatContainer.appendChild(welcome);
        saveChatMessage(customization.bot_message_user_message, false);
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
    const background = isUser ? customization.user_message_bg : customization.bot_message_bg;
    const textColor = isUser ? customization.user_message_bg_text_color : customization.bot_message_bg_text_color;
    const fontFamily = isUser ? customization.user_message_font_family : customization.font_family;
    const fontSize = isUser ? customization.user_message_bg_font_size : customization.bot_message_bg_font_size;
    const alignment = isUser ? 'margin-left: auto;' : 'margin-right: auto;';
    msgEl.style.cssText = `
      padding: 12px 16px;
      border-radius: 16px;
      max-width: 80%;
      word-wrap: break-word;
      line-height: 1.5;
      background: ${background};
      color: ${textColor};
      font-family: ${fontFamily};
      font-size: ${fontSize};
      ${alignment}
      box-shadow: 0 6px 16px rgba(15, 23, 42, 0.15);
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
      background: ${hexWithOpacity(customization.bot_message_bg || customization.primary_color, 0.4)};
      color: ${customization.bot_message_bg_text_color || customization.text_color};
      font-style: italic;
      font-family: ${customization.font_family};
      font-size: ${customization.bot_message_bg_font_size};
      align-self: flex-start;
    `;
    chatContainer.appendChild(typing);
    chatContainer.scrollTop = chatContainer.scrollHeight;
 
    try {
      // Get IP address dynamically
      const ipAddress = await getIpAddress();
      
      const response = await fetch(`${API_BASE}/chat?website_url=${encodeURIComponent(customization.website_url)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assistant_name: customization.brand_name,
          message: message,
          session_id: sessionId,
          user_email: userInfo.email,
          user_name: userInfo.name,
          phone_number: userInfo.phone || null,
          ip_address: ipAddress || null,
          publish_key: publishKey
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
          } else if (customization.bot_message_user_message) {
            const welcome = createMessageElement(customization.bot_message_user_message, false);
            chatContainer.appendChild(welcome);
            saveChatMessage(customization.bot_message_user_message, false);
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