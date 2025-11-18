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
  // Add global styles to prevent CSS conflicts
  function addGlobalStyles() {
    const styleId = `webnotics-global-styles-${publishKey}`;
    if (document.getElementById(styleId)) return;

    const globalStyle = document.createElement('style');
    globalStyle.id = styleId;
    globalStyle.textContent = `
      /* Prevent conflicts with website CSS - Scoped to webnotics elements */
      #webnotics-chatbot *,
      #webnotics-form-overlay *,
      #webnotics-toggle {
        box-sizing: border-box !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      
      #webnotics-chatbot .webnotics-bot-message h2 {
      font-style: italic;
      font-weight: bold;
      margin-bottom: 15px !important;
      }
      #webnotics-chatbot .webnotics-bot-message h3 {
      font-style: italic;
      font-weight: bold !important;
      margin-bottom: 10px !important;
      }
      #webnotics-chatbot .webnotics-bot-message p {
      margin-bottom: 10px !important;
      }
#webnotics-chatbot .webnotics-bot-message ul li {
margin-bottom: 10px !important;
}
#webnotics-chatbot .webnotics-bot-message a {
text-decoration: underline !important;
    font-style: italic !important;
    }
      #webnotics-chatbot button,
      #webnotics-form-overlay button,
      #webnotics-toggle {
        font-family: inherit !important;
        font-size: inherit !important;
        line-height: inherit !important;
        text-decoration: none !important;
        text-transform: none !important;
        letter-spacing: normal !important;
        word-spacing: normal !important;
        text-indent: 0 !important;
        text-shadow: none !important;
        display: inline-block !important;
        text-align: center !important;
        cursor: pointer !important;
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        appearance: none !important;
        outline: none !important;
      }
      #webnotics-chatbot input, #webnotics-form-overlay input {
      color: #000000;
      } 
      #webnotics-chatbot input,
      #webnotics-form-overlay input {
        font-family: inherit !important;
        font-size: inherit !important;
        line-height: inherit !important;
        margin: 0 !important;
        padding: 0 !important;
        border: none !important;
        outline: none !important;
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        appearance: none !important;
        background: transparent !important;
      }
      
      #webnotics-chatbot div,
      #webnotics-form-overlay div {
        margin: 0 !important;
        padding: 0 !important;
      }
      
      #webnotics-chatbot p,
      #webnotics-form-overlay p {
        margin: 0 !important;
        padding: 0 !important;
      }
      
      #webnotics-chatbot h1,
      #webnotics-chatbot h2,
      #webnotics-chatbot h3,
      #webnotics-chatbot h4,
      #webnotics-chatbot h5,
      #webnotics-chatbot h6,
      #webnotics-form-overlay h1,
      #webnotics-form-overlay h2,
      #webnotics-form-overlay h3,
      #webnotics-form-overlay h4,
      #webnotics-form-overlay h5,
      #webnotics-form-overlay h6 {
        margin: 0 !important;
        padding: 0 !important;
        font-weight: normal !important;
        font-size: inherit !important;
        line-height: inherit !important;
      }
      
      #webnotics-chatbot span,
      #webnotics-form-overlay span {
        display: inline !important;
      }
      
      #webnotics-chatbot img,
      #webnotics-form-overlay img {
        border: none !important;
        max-width: 100% !important;
        height: auto !important;
        vertical-align: middle !important;
      }
      
      #webnotics-chatbot ul,
      #webnotics-chatbot ol,
      #webnotics-form-overlay ul,
      #webnotics-form-overlay ol {
        list-style: none !important;
        margin: 0 !important;
        padding: 0 !important;
      }
      
      #webnotics-chatbot a,
      #webnotics-form-overlay a {
        text-decoration: none !important;
        color: inherit !important;
      }
    `;
    document.head.appendChild(globalStyle);
  }

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
      // Add global styles first to prevent conflicts
      addGlobalStyles();

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
      // Still add global styles even if customization fails
      addGlobalStyles();
      console.error('Webnotics Chatbot: Failed to load customization', err);
    }
  }

  // Validation functions
  function validateEmail(email) {
    if (!email || typeof email !== 'string') {
      return false;
    }

    const trimmedEmail = email.trim();

    // Basic length check
    if (trimmedEmail.length < 5 || trimmedEmail.length > 254) {
      return false;
    }

    // Check for @ symbol
    if (trimmedEmail.indexOf('@') === -1) {
      return false;
    }

    // Split into local and domain parts
    const parts = trimmedEmail.split('@');
    if (parts.length !== 2) {
      return false;
    }

    const localPart = parts[0];
    const domainPart = parts[1];

    // Validate local part (before @)
    if (localPart.length === 0 || localPart.length > 64) {
      return false;
    }

    // Local part cannot start or end with dot
    if (localPart.startsWith('.') || localPart.endsWith('.')) {
      return false;
    }

    // Local part cannot have consecutive dots
    if (localPart.includes('..')) {
      return false;
    }

    // Local part should only contain valid characters
    const localPartRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
    if (!localPartRegex.test(localPart)) {
      return false;
    }

    // Validate domain part (after @)
    if (domainPart.length === 0 || domainPart.length > 253) {
      return false;
    }

    // Domain cannot start or end with dot or hyphen
    if (domainPart.startsWith('.') || domainPart.endsWith('.') ||
      domainPart.startsWith('-') || domainPart.endsWith('-')) {
      return false;
    }

    // Domain cannot have consecutive dots
    if (domainPart.includes('..')) {
      return false;
    }

    // Domain must have at least one dot
    if (domainPart.indexOf('.') === -1) {
      return false;
    }

    // Split domain into labels
    const domainLabels = domainPart.split('.');

    // Check each label
    for (let i = 0; i < domainLabels.length; i++) {
      const label = domainLabels[i];

      // Each label must be 1-63 characters
      if (label.length === 0 || label.length > 63) {
        return false;
      }

      // Label cannot start or end with hyphen
      if (label.startsWith('-') || label.endsWith('-')) {
        return false;
      }

      // Label should only contain alphanumeric and hyphens
      const labelRegex = /^[a-zA-Z0-9-]+$/;
      if (!labelRegex.test(label)) {
        return false;
      }
    }

    // Top-level domain (last label) must be at least 2 characters and only letters
    const tld = domainLabels[domainLabels.length - 1];
    if (tld.length < 2 || !/^[a-zA-Z]+$/.test(tld)) {
      return false;
    }

    // Final comprehensive regex check
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    return emailRegex.test(trimmedEmail);
  }

  function validateName(name) {
    // Name should be at least 2 characters and contain only letters, spaces, hyphens, and apostrophes
    const nameRegex = /^[a-zA-Z\s'-]{2,}$/;
    return nameRegex.test(name.trim());
  }

  function validatePhone(phone) {
    if (!phone || typeof phone !== 'string') {
      return { valid: false, error: 'Phone number is required' };
    }

    // Remove all formatting characters (spaces, dashes, parentheses, dots, plus signs)
    const cleaned = phone.replace(/[\s\-\(\)\.\+]/g, '');

    // Check if it contains only digits
    if (!/^\d+$/.test(cleaned)) {
      return { valid: false, error: 'Phone number must contain only digits' };
    }

    // Check length (10-15 digits for international format)
    if (cleaned.length < 10) {
      return { valid: false, error: 'Phone number must have at least 10 digits' };
    }
    if (cleaned.length > 15) {
      return { valid: false, error: 'Phone number cannot exceed 15 digits' };
    }

    // Additional checks for common invalid patterns
    // Reject if all digits are the same (e.g., 1111111111)
    if (/^(\d)\1{9,}$/.test(cleaned)) {
      return { valid: false, error: 'Phone number cannot have all same digits' };
    }

    // Reject if it's all zeros
    if (/^0+$/.test(cleaned)) {
      return { valid: false, error: 'Phone number cannot be all zeros' };
    }

    // Check for valid country code patterns (if starts with country code)
    // Most country codes are 1-3 digits
    // For numbers starting with 1 (US/Canada), should be 11 digits total
    if (cleaned.startsWith('1') && cleaned.length === 11) {
      // Valid US/Canada format
      return { valid: true, error: null };
    }

    // For other international numbers, validate structure
    // Country code (1-3 digits) + subscriber number (at least 7 digits)
    if (cleaned.length >= 10 && cleaned.length <= 15) {
      return { valid: true, error: null };
    }

    return { valid: false, error: 'Please enter a valid phone number (10-15 digits)' };
  }

  // Helper function to get phone validation result
  function getPhoneValidation(phone) {
    const result = validatePhone(phone);
    return result.valid;
  }

  // Helper function to get phone error message
  function getPhoneErrorMessage(phone) {
    const result = validatePhone(phone);
    return result.error || 'Please enter a valid phone number (10-15 digits)';
  }

  // Helper function to add !important to all CSS properties
  function addImportant(cssString) {
    if (!cssString) return cssString;
    // Split by semicolon, add !important to each property, then join back
    return cssString.split(';')
      .map(prop => {
        const trimmed = prop.trim();
        if (!trimmed) return '';
        // Check if !important already exists
        if (trimmed.includes('!important')) return trimmed;
        // Add !important before semicolon
        return trimmed + ' !important';
      })
      .filter(prop => prop)
      .join('; ') + (cssString.trim().endsWith(';') ? ';' : '');
  }

  // Show user info form
  function showUserForm(callback) {
    const formOverlay = document.createElement('div');
    formOverlay.id = 'webnotics-form-overlay';
    formOverlay.style.cssText = addImportant(`
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
    `);

    const formBox = document.createElement('div');
    formBox.id = 'webnotics-form-box';
    formBox.className = 'webnotics-form-box';
    formBox.style.cssText = addImportant(`
      background: ${customization?.background_color || '#FFFFFF'};
      color: ${customization?.text_color || '#000000'};
      padding: 24px;
      border-radius: 12px;
      max-width: 400px;
      width: 90%;
      font-family: ${customization?.font_family || 'Arial, sans-serif'};
    `);

    const title = document.createElement('h3');
    title.id = 'webnotics-form-title';
    title.className = 'webnotics-form-title';
    title.textContent = customization?.brand_name || 'Welcome';
    title.style.cssText = addImportant(`
      margin: 0 0 16px 0;
      font-weight: 700;
      color: #000000;
      font-family: ${customization?.header_font_family || customization?.font_family || 'Arial, sans-serif'};
      font-size: ${customization?.header_font_size || '18px'};
      text-align: center;
    `);

    const nameInput = document.createElement('input');
    nameInput.id = 'webnotics-name-input';
    nameInput.className = 'webnotics-name-input';
    nameInput.type = 'text';
    nameInput.placeholder = 'Your Name';
    nameInput.required = true;
    nameInput.style.cssText = addImportant(`
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-family: ${customization?.font_family || 'Arial, sans-serif'};
      box-sizing: border-box;
    `);

    const nameError = document.createElement('div');
    nameError.id = 'webnotics-name-error';
    nameError.className = 'webnotics-name-error';
    nameError.style.cssText = addImportant(`
      color: #ff4444;
      font-size: 12px;
      margin-bottom: 12px;
      display: none;
      font-family: ${customization?.font_family || 'Arial, sans-serif'};
    `);

    const emailInput = document.createElement('input');
    emailInput.id = 'webnotics-email-input';
    emailInput.className = 'webnotics-email-input';
    emailInput.type = 'email';
    emailInput.placeholder = 'Your Email';
    emailInput.required = true;
    emailInput.style.cssText = addImportant(`
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-family: ${customization?.font_family || 'Arial, sans-serif'};
      box-sizing: border-box;
    `);

    const emailError = document.createElement('div');
    emailError.id = 'webnotics-email-error';
    emailError.className = 'webnotics-email-error';
    emailError.style.cssText = addImportant(`
      color: #ff4444;
      font-size: 12px;
      margin-bottom: 12px;
      display: none;
      font-family: ${customization?.font_family || 'Arial, sans-serif'};
    `);

    const phoneInput = document.createElement('input');
    phoneInput.id = 'webnotics-phone-input';
    phoneInput.className = 'webnotics-phone-input';
    phoneInput.type = 'tel';
    phoneInput.placeholder = 'Your Phone Number (e.g., +1234567890)';
    phoneInput.required = true;
    phoneInput.style.cssText = addImportant(`
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 6px;
      font-family: ${customization?.font_family || 'Arial, sans-serif'};
      box-sizing: border-box;
    `);

    const phoneError = document.createElement('div');
    phoneError.id = 'webnotics-phone-error';
    phoneError.className = 'webnotics-phone-error';
    phoneError.style.cssText = addImportant(`
      color: #ff4444;
      font-size: 12px;
      margin-bottom: 16px;
      display: none;
      font-family: ${customization?.font_family || 'Arial, sans-serif'};
    `);

    const submitBtn = document.createElement('button');
    submitBtn.id = 'webnotics-form-submit';
    submitBtn.className = 'webnotics-form-submit';
    submitBtn.type = 'button';
    submitBtn.textContent = 'Start Chat';
    submitBtn.style.cssText = addImportant(`
      width: 100%;
      padding: 12px;
      background: ${customization?.submit_button_bg || customization?.primary_color || '#0000FF'};
      color: ${customization?.submit_button_color || '#FFFFFF'};
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-family: ${customization?.submit_button_font_family || customization?.font_family || 'Arial, sans-serif'};
    `);

    // Real-time validation
    nameInput.addEventListener('blur', () => {
      const name = nameInput.value.trim();
      if (name && !validateName(name)) {
        nameError.textContent = 'Please enter a valid name (at least 2 characters, letters only)';
        nameError.style.setProperty('display', 'block', 'important');
        nameInput.style.setProperty('border-color', '#ff4444', 'important');
      } else {
        nameError.style.setProperty('display', 'none', 'important');
        nameInput.style.setProperty('border-color', '#ccc', 'important');
      }
    });

    nameInput.addEventListener('input', () => {
      if (nameError.style.display === 'block') {
        const name = nameInput.value.trim();
        if (validateName(name) || !name) {
          nameError.style.setProperty('display', 'none', 'important');
          nameInput.style.setProperty('border-color', '#ccc', 'important');
        }
      }
    });

    emailInput.addEventListener('blur', () => {
      const email = emailInput.value.trim();
      if (email && !validateEmail(email)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.style.setProperty('display', 'block', 'important');
        emailInput.style.setProperty('border-color', '#ff4444', 'important');
      } else {
        emailError.style.setProperty('display', 'none', 'important');
        emailInput.style.setProperty('border-color', '#ccc', 'important');
      }
    });

    emailInput.addEventListener('input', () => {
      if (emailError.style.display === 'block') {
        const email = emailInput.value.trim();
        if (validateEmail(email) || !email) {
          emailError.style.setProperty('display', 'none', 'important');
          emailInput.style.setProperty('border-color', '#ccc', 'important');
        }
      }
    });

    phoneInput.addEventListener('blur', () => {
      const phone = phoneInput.value.trim();
      if (phone && !getPhoneValidation(phone)) {
        phoneError.textContent = getPhoneErrorMessage(phone);
        phoneError.style.setProperty('display', 'block', 'important');
        phoneInput.style.setProperty('border-color', '#ff4444', 'important');
      } else {
        phoneError.style.setProperty('display', 'none', 'important');
        phoneInput.style.setProperty('border-color', '#ccc', 'important');
      }
    });

    phoneInput.addEventListener('input', () => {
      if (phoneError.style.display === 'block') {
        const phone = phoneInput.value.trim();
        if (getPhoneValidation(phone) || !phone) {
          phoneError.style.setProperty('display', 'none', 'important');
          phoneInput.style.setProperty('border-color', '#ccc', 'important');
        }
      }
    });

    submitBtn.onclick = (e) => {
      e.preventDefault();

      // Reset errors
      nameError.style.setProperty('display', 'none', 'important');
      emailError.style.setProperty('display', 'none', 'important');
      phoneError.style.setProperty('display', 'none', 'important');
      nameInput.style.setProperty('border-color', '#ccc', 'important');
      emailInput.style.setProperty('border-color', '#ccc', 'important');
      phoneInput.style.setProperty('border-color', '#ccc', 'important');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const phone = phoneInput.value.trim();

      let isValid = true;

      // Validate name
      if (!name) {
        nameError.textContent = 'Name is required';
        nameError.style.setProperty('display', 'block', 'important');
        nameInput.style.setProperty('border-color', '#ff4444', 'important');
        isValid = false;
      } else if (!validateName(name)) {
        nameError.textContent = 'Please enter a valid name (at least 2 characters, letters only)';
        nameError.style.setProperty('display', 'block', 'important');
        nameInput.style.setProperty('border-color', '#ff4444', 'important');
        isValid = false;
      }

      // Validate email
      if (!email) {
        emailError.textContent = 'Email is required';
        emailError.style.setProperty('display', 'block', 'important');
        emailInput.style.setProperty('border-color', '#ff4444', 'important');
        isValid = false;
      } else if (!validateEmail(email)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.style.setProperty('display', 'block', 'important');
        emailInput.style.setProperty('border-color', '#ff4444', 'important');
        isValid = false;
      }

      // Validate phone
      if (!phone) {
        phoneError.textContent = 'Phone number is required';
        phoneError.style.setProperty('display', 'block', 'important');
        phoneInput.style.setProperty('border-color', '#ff4444', 'important');
        isValid = false;
      } else if (!getPhoneValidation(phone)) {
        phoneError.textContent = getPhoneErrorMessage(phone);
        phoneError.style.setProperty('display', 'block', 'important');
        phoneInput.style.setProperty('border-color', '#ff4444', 'important');
        isValid = false;
      }

      if (isValid) {
        const info = {
          name: name,
          email: email,
          phone: phone
        };
        saveUserInfo(info);
        formOverlay.remove();
        callback(info);
      }
    };

    formBox.appendChild(title);
    formBox.appendChild(nameInput);
    formBox.appendChild(nameError);
    formBox.appendChild(emailInput);
    formBox.appendChild(emailError);
    formBox.appendChild(phoneInput);
    formBox.appendChild(phoneError);
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
    chatbot.style.cssText = addImportant(`
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
    `);

    // Header
    const header = document.createElement('div');
    header.id = 'webnotics-chat-header';
    header.className = 'webnotics-chat-header';
    header.style.cssText = addImportant(`
      background: ${customization.header_bg};
      color: ${customization.header_text_color};
      padding: 16px;
      border-radius: 17px 17px 0 0;
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: ${customization.header_font_family};
    `);

    // Create icon container
    const iconContainer = document.createElement('div');
    iconContainer.id = 'webnotics-icon-container';
    iconContainer.className = 'webnotics-icon-container';
    iconContainer.style.cssText = addImportant('max-width: 100px; max-height: 60px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;');

    if (customization.logo_url && customization.logo_url.trim()) {
      const logo = document.createElement('img');
      logo.id = 'webnotics-logo';
      logo.className = 'webnotics-logo';
      logo.src = customization.logo_url;
      logo.alt = customization.brand_name || 'AI assistant';
      logo.style.cssText = addImportant('width: auto; max-height: 60px; display: block;');
      logo.onerror = function () {
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
    brandName.id = 'webnotics-brand-name';
    brandName.className = 'webnotics-brand-name';
    brandName.textContent = customization.brand_name || 'AI assistant';
    brandName.style.cssText = addImportant(`
      font-weight: bold;
      font-size: ${customization.header_font_size};
      font-family: ${customization.header_font_family};
      color: ${customization.header_text_color};
      flex: 1;
    `);
    header.appendChild(brandName);

    const closeBtn = document.createElement('button');
    closeBtn.id = 'webnotics-close-btn';
    closeBtn.className = 'webnotics-close-btn';
    closeBtn.type = 'button';
    closeBtn.innerHTML = '×';
    closeBtn.style.cssText = addImportant(`
      margin-left: auto;
      background: none;
      border: none;
      color: ${customization.header_text_color};
      font-size: 30px;
      cursor: pointer;
      line-height: 1;
    `);
    closeBtn.onclick = () => toggleChatbot();
    header.appendChild(closeBtn);

    // Chat container
    const chatContainer = document.createElement('div');
    chatContainer.id = 'webnotics-chat-container';
    chatContainer.className = 'webnotics-chat-container';
    chatContainer.style.cssText = addImportant(`
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      max-height: 400px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      font-family: ${customization.font_family};
    `);

    // Load chat history only if user info exists (will be loaded in createChatbotUI)

    // Input area
    const inputArea = document.createElement('div');
    inputArea.id = 'webnotics-input-area';
    inputArea.className = 'webnotics-input-area';
    inputArea.style.cssText = addImportant(`
      padding: 12px 16px;
      border-top: 1px solid ${hexWithOpacity(customization.input_text_color, 0.15)};
      display: flex;
      gap: 10px;
      align-items: center;
      background: ${customization.input_bg};
      border-radius: 0 0 17px 17px !important;
    `);

    const input = document.createElement('input');
    input.id = 'webnotics-chat-input';
    input.className = 'webnotics-chat-input';
    input.type = 'text';
    input.placeholder = customization.input_placeholder_text || 'Type your message...';
    input.style.cssText = addImportant(`
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
    `);

    const placeholderStyleId = `webnotics-placeholder-style-${publishKey}`;
    let placeholderStyle = document.getElementById(placeholderStyleId);
    if (!placeholderStyle) {
      placeholderStyle = document.createElement('style');
      placeholderStyle.id = placeholderStyleId;
      document.head.appendChild(placeholderStyle);
    }
    placeholderStyle.textContent = `
      #webnotics-chat-input::placeholder {
        color: ${customization.input_placeholder_text_color} !important;
        font-family: ${customization.input_placeholder_font_family || customization.font_family} !important;
        opacity: 0.7 !important;
      }
    `;

    const sendBtn = document.createElement('button');
    sendBtn.id = 'webnotics-send-btn';
    sendBtn.className = 'webnotics-send-btn';
    sendBtn.type = 'button';
    sendBtn.textContent = 'Send';
    sendBtn.style.cssText = addImportant(`
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
    `);

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
    toggleBtn.className = 'webnotics-toggle';
    toggleBtn.type = 'button';
    toggleBtn.innerHTML = '💬';
    toggleBtn.style.cssText = addImportant(`
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
    `);
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

    chatbot.style.setProperty('display', 'none', 'important');
    toggleBtn.style.setProperty('display', 'block', 'important');

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
    msgEl.className = isUser ? 'webnotics-user-message' : 'webnotics-bot-message';
    const background = isUser ? customization.user_message_bg : customization.bot_message_bg;
    const textColor = isUser ? customization.user_message_bg_text_color : customization.bot_message_bg_text_color;
    const fontFamily = isUser ? customization.user_message_font_family : customization.font_family;
    const fontSize = isUser ? customization.user_message_bg_font_size : customization.bot_message_bg_font_size;
    const alignment = isUser ? 'margin-left: auto;' : 'margin-right: auto;';
    msgEl.style.cssText = addImportant(`
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
    `);

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

    // Show typing indicator with animation
    const typing = document.createElement('div');
    typing.id = 'webnotics-typing-indicator';
    typing.className = 'webnotics-typing-indicator';

    // Create animated typing dots
    const typingText = document.createElement('span');
    typingText.textContent = 'Typing';
    typingText.id = 'webnotics-typing-text';

    const typingDots = document.createElement('span');
    typingDots.id = 'webnotics-typing-dots';
    typingDots.textContent = '...';
    typingDots.style.cssText = addImportant(`
      display: inline-block;
      width: 20px;
      text-align: left;
    `);

    typing.appendChild(typingText);
    typing.appendChild(typingDots);

    typing.style.cssText = addImportant(`
      padding: 10px 14px;
      border-radius: 12px;
      background: ${hexWithOpacity(customization.bot_message_bg || customization.primary_color, 0.4)};
      color: ${customization.bot_message_bg_text_color || customization.text_color};
      font-style: italic;
      font-family: ${customization.font_family};
      font-size: ${customization.bot_message_bg_font_size};
      align-self: flex-start;
      display: flex;
      align-items: center;
    `);

    // Add CSS animation for typing dots
    const typingAnimationId = `webnotics-typing-animation-${publishKey}`;
    let typingAnimationStyle = document.getElementById(typingAnimationId);
    if (!typingAnimationStyle) {
      typingAnimationStyle = document.createElement('style');
      typingAnimationStyle.id = typingAnimationId;
      typingAnimationStyle.textContent = `
        @keyframes webnotics-typing-dots {
          0%, 20% {
            content: '.';
          }
          40% {
            content: '..';
          }
          60%, 100% {
            content: '...';
          }
        }
        #webnotics-typing-dots {
          animation: webnotics-typing-dots 1.4s steps(4, end) infinite !important;
        }
        #webnotics-typing-dots::after {
          content: '...';
          animation: webnotics-typing-dots 1.4s steps(4, end) infinite !important;
        }
      `;
      document.head.appendChild(typingAnimationStyle);
    }

    // Alternative: Use JavaScript animation for better browser compatibility
    let dotCount = 0;
    const typingInterval = setInterval(() => {
      dotCount = (dotCount + 1) % 4;
      typingDots.textContent = '.'.repeat(dotCount);
    }, 400);

    // Store interval ID on typing element so we can clear it later
    typing._typingInterval = typingInterval;

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

      // Clear typing animation interval before removing
      if (typing._typingInterval) {
        clearInterval(typing._typingInterval);
      }
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
      // Clear typing animation interval before removing
      if (typing._typingInterval) {
        clearInterval(typing._typingInterval);
      }
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
      if (chatbot.style.display === 'none' || chatbot.style.getPropertyValue('display') === 'none') {
        chatbot.style.setProperty('display', 'flex', 'important');
        toggleBtn.style.setProperty('display', 'none', 'important');
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
        chatbot.style.setProperty('display', 'none', 'important');
        toggleBtn.style.setProperty('display', 'block', 'important');
      }
    }
  }

  // Initialize
  loadCustomization();
})();