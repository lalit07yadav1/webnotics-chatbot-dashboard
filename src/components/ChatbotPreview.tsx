interface ChatbotPreviewProps {
  logoUrl: string;
  brandName: string;
  primaryColor: string;
  textColor: string;
  backgroundColor: string;
  fontFamily: string;
  botMessageBg: string;
  botMessageBgFontSize: string;
  botMessageBgTextColor: string;
  botMessageUserMessage: string;
  userMessageBg: string;
  userMessageBgFontSize: string;
  userMessageBgTextColor: string;
  userMessageFontFamily: string;
  headerBg: string;
  headerFontSize: string;
  headerTextColor: string;
  headerFontFamily: string;
  inputBg: string;
  inputTextColor: string;
  inputPlaceholderText: string;
  inputPlaceholderTextColor: string;
  inputPlaceholderFontFamily: string;
  submitButtonBg: string;
  submitButtonColor: string;
  submitButtonFontFamily: string;
}

export default function ChatbotPreview({
  logoUrl,
  brandName,
  primaryColor: _primaryColor,
  textColor: _textColor,
  backgroundColor,
  fontFamily,
  botMessageBg,
  botMessageBgFontSize,
  botMessageBgTextColor,
  botMessageUserMessage,
  userMessageBg,
  userMessageBgFontSize,
  userMessageBgTextColor,
  userMessageFontFamily,
  headerBg,
  headerFontSize,
  headerTextColor,
  headerFontFamily,
  inputBg,
  inputTextColor,
  inputPlaceholderText,
  inputPlaceholderTextColor,
  inputPlaceholderFontFamily,
  submitButtonBg,
  submitButtonColor,
  submitButtonFontFamily,
}: ChatbotPreviewProps) {
  return (
    <div className="relative">
      <h3 className="mb-4 text-lg font-semibold text-white">Preview</h3>
      <div
        className="rounded-lg border border-gray-700 overflow-hidden"
        style={{
          width: '380px',
          maxHeight: '600px',
          background: backgroundColor,
          fontFamily: fontFamily,
        }}
      >
        {/* Header */}
        <div
          style={{
            background: headerBg,
            color: headerTextColor,
            padding: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontFamily: headerFontFamily,
            fontSize: headerFontSize,
          }}
        >
          {logoUrl && (
            <img
              src={logoUrl}
              alt={brandName || 'AI assistant'}
              style={{
                maxWidth: '32px',
                maxHeight: '32px',
                width: 'auto',
                height: 'auto',
                borderRadius: '50%',
                objectFit: 'cover',
                flexShrink: 0,
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
          <span style={{ fontWeight: 'bold', flex: 1 }}>
            {brandName || 'AI assistant'}
          </span>
          <span style={{ fontSize: '24px', lineHeight: 1 }}>×</span>
        </div>

        {/* Chat Container */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '16px',
            maxHeight: '400px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            fontFamily: fontFamily,
            minHeight: '300px',
          }}
        >
          {/* Bot Welcome Message */}
          {botMessageUserMessage && (
            <div
              className="bot-message-preview"
              style={{
                padding: '12px 16px',
                borderRadius: '16px',
                width: '100%',
                maxWidth: '100%',
                wordWrap: 'break-word',
                lineHeight: 1.5,
                background: botMessageBg,
                color: botMessageBgTextColor,
                fontFamily: fontFamily,
                fontSize: botMessageBgFontSize,
                textAlign: 'left',
                boxShadow: '0 6px 16px rgba(15, 23, 42, 0.15)',
                marginBottom: '8px',
              }}
            >
              {botMessageUserMessage}
            </div>
          )}

          {/* Sample User Message */}
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '16px',
              width: 'auto',
              maxWidth: '80%',
              wordWrap: 'break-word',
              lineHeight: 1.5,
              background: userMessageBg,
              color: userMessageBgTextColor,
              fontFamily: userMessageFontFamily,
              fontSize: userMessageBgFontSize,
              marginLeft: 'auto',
              textAlign: 'right',
              boxShadow: '0 6px 16px rgba(15, 23, 42, 0.15)',
              marginBottom: '8px',
            }}
          >
            Hello! How can I help?
          </div>

          {/* Sample Bot Response with HTML formatting */}
          <div
            className="bot-message-preview"
            style={{
              padding: '12px 16px',
              borderRadius: '16px',
              width: '100%',
              maxWidth: '100%',
              wordWrap: 'break-word',
              lineHeight: 1.5,
              background: botMessageBg,
              color: botMessageBgTextColor,
              fontFamily: fontFamily,
              fontSize: botMessageBgFontSize,
              textAlign: 'left',
              boxShadow: '0 6px 16px rgba(15, 23, 42, 0.15)',
              marginBottom: '8px',
            }}
            dangerouslySetInnerHTML={{
              __html: `<h3 style="font-weight: bold; font-size: 1.1em; margin-bottom: 10px; margin-top: 8px; line-height: 1.3;">Contact Information</h3>
<p style="margin-bottom: 10px; line-height: 1.6;"><strong>Phone:</strong> (760) 728-1295</p>
<p style="margin-bottom: 10px; line-height: 1.6;"><strong>Email:</strong> <a href="mailto:info@example.com" style="text-decoration: underline; color: inherit; cursor: pointer;">info@example.com</a></p>
<ul style="margin: 10px 0; padding-left: 20px; list-style-type: disc; list-style-position: outside;">
  <li style="margin-bottom: 8px; line-height: 1.6; padding-left: 4px;">Monday - Friday: 9 AM - 5 PM</li>
  <li style="margin-bottom: 8px; line-height: 1.6; padding-left: 4px;">Saturday: 10 AM - 2 PM</li>
  <li style="margin-bottom: 8px; line-height: 1.6; padding-left: 4px;">Sunday: Closed</li>
</ul>`
            }}
          />
        </div>

        {/* Input Area */}
        <div
          style={{
            padding: '12px 16px',
            borderTop: `1px solid ${hexWithOpacity(inputTextColor, 0.15)}`,
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            background: inputBg,
          }}
        >
          <input
            type="text"
            placeholder={inputPlaceholderText || 'Type your message...'}
            disabled
            style={{
              flex: 1,
              padding: '12px 16px',
              border: `1px solid ${hexWithOpacity(inputTextColor, 0.2)}`,
              borderRadius: '24px',
              background: inputBg,
              color: inputTextColor,
              fontFamily: inputPlaceholderFontFamily || fontFamily,
              fontSize: '14px',
              outline: 'none',
              minWidth: 0,
            }}
            className="placeholder-opacity-75"
          />
          <style>
            {`
              input::placeholder {
                color: ${inputPlaceholderTextColor};
                font-family: ${inputPlaceholderFontFamily || fontFamily};
                opacity: 0.7;
              }
              .bot-message-preview h1 {
                font-weight: bold !important;
                font-size: 1.5em !important;
                margin-bottom: 12px !important;
                margin-top: 8px !important;
                line-height: 1.3 !important;
              }
              .bot-message-preview h2 {
                font-weight: bold !important;
                font-size: 1.3em !important;
                margin-bottom: 12px !important;
                margin-top: 8px !important;
                line-height: 1.3 !important;
              }
              .bot-message-preview h3 {
                font-weight: bold !important;
                font-size: 1.1em !important;
                margin-bottom: 10px !important;
                margin-top: 8px !important;
                line-height: 1.3 !important;
              }
              .bot-message-preview h4,
              .bot-message-preview h5,
              .bot-message-preview h6 {
                font-weight: bold !important;
                margin-bottom: 8px !important;
                margin-top: 6px !important;
                line-height: 1.3 !important;
              }
              .bot-message-preview p {
                margin-bottom: 10px !important;
                line-height: 1.6 !important;
              }
              .bot-message-preview ul,
              .bot-message-preview ol {
                margin: 10px 0 !important;
                padding-left: 20px !important;
                list-style-position: outside !important;
              }
              .bot-message-preview ul {
                list-style-type: disc !important;
              }
              .bot-message-preview ol {
                list-style-type: decimal !important;
              }
              .bot-message-preview ul li,
              .bot-message-preview ol li {
                margin-bottom: 8px !important;
                line-height: 1.6 !important;
                padding-left: 4px !important;
              }
              .bot-message-preview strong,
              .bot-message-preview b {
                font-weight: bold !important;
              }
              .bot-message-preview em,
              .bot-message-preview i {
                font-style: italic !important;
              }
              .bot-message-preview u {
                text-decoration: underline !important;
              }
              .bot-message-preview a {
                text-decoration: underline !important;
                color: inherit !important;
                cursor: pointer !important;
              }
              .bot-message-preview a:hover {
                opacity: 0.8 !important;
              }
              .bot-message-preview div {
                margin-bottom: 8px !important;
                line-height: 1.6 !important;
              }
              .bot-message-preview br {
                line-height: 1.6 !important;
              }
            `}
          </style>
          <button
            disabled
            style={{
              padding: '12px 24px',
              background: submitButtonBg,
              color: submitButtonColor,
              border: 'none',
              borderRadius: '24px',
              cursor: 'pointer',
              fontFamily: submitButtonFontFamily || fontFamily,
              fontSize: '14px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              height: '44px',
              flexShrink: 0,
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function hexWithOpacity(hex: string, opacity: number = 0.7): string {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

