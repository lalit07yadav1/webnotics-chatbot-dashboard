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
              style={{
                padding: '12px 16px',
                borderRadius: '16px',
                maxWidth: '80%',
                wordWrap: 'break-word',
                lineHeight: 1.5,
                background: botMessageBg,
                color: botMessageBgTextColor,
                fontFamily: fontFamily,
                fontSize: botMessageBgFontSize,
                alignSelf: 'flex-start',
                boxShadow: '0 6px 16px rgba(15, 23, 42, 0.15)',
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
              maxWidth: '80%',
              wordWrap: 'break-word',
              lineHeight: 1.5,
              background: userMessageBg,
              color: userMessageBgTextColor,
              fontFamily: userMessageFontFamily,
              fontSize: userMessageBgFontSize,
              alignSelf: 'flex-end',
              boxShadow: '0 6px 16px rgba(15, 23, 42, 0.15)',
            }}
          >
            Hello! How can I help?
          </div>

          {/* Sample Bot Response */}
          <div
            style={{
              padding: '12px 16px',
              borderRadius: '16px',
              maxWidth: '80%',
              wordWrap: 'break-word',
              lineHeight: 1.5,
              background: botMessageBg,
              color: botMessageBgTextColor,
              fontFamily: fontFamily,
              fontSize: botMessageBgFontSize,
              alignSelf: 'flex-start',
              boxShadow: '0 6px 16px rgba(15, 23, 42, 0.15)',
            }}
          >
            I'm here to help! What would you like to know?
          </div>
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

