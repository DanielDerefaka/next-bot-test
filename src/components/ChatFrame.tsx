'use client';

import { useEffect, useRef } from 'react';

const ChatbotIframe = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = document.createElement('iframe');
    
    const iframeStyles = (styleString: string) => {
      const style = document.createElement('style');
      style.textContent = styleString;
      document.head.append(style);
    }
    
    iframeStyles(`
      .chat-frame {
        position: fixed;
        bottom: 50px;
        right: 50px;
        border: none;
      }
    `);
    
    iframe.src = "https://pictel-ai.vercel.app/chatbot";
    iframe.classList.add('chat-frame');
    document.body.appendChild(iframe);

    const messageHandler = (e: MessageEvent) => {
      if (e.origin !== "https://pictel-ai.vercel.app") return;
      
      try {
        const dimensions = JSON.parse(e.data);
        iframe.width = dimensions.width;
        iframe.height = dimensions.height;
        iframe.contentWindow?.postMessage(
          "4fd9155f-ac85-4f3a-9d48-93e14babb1ae", 
          "https://pictel-ai.vercel.app/"
        );
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    window.addEventListener("message", messageHandler);

    // Cleanup function
    return () => {
      window.removeEventListener("message", messageHandler);
      document.body.removeChild(iframe);
    };
  }, []);

  return null; // This component doesn't render anything visible
};

export default ChatbotIframe;