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

        @media (max-width: 767px) {
            .chat-frame {
                width: 100vw;
                height: 90vh;
                bottom: 20px;
                right: -30px;
                padding: 15px;
            }
        }

        @media (max-width: 480px) {
            .chat-frame {
                width: 100vw;
                height: 90vh;
                bottom: 0;
                right: 0;
                padding: 10px;
            }
        }

        @media (max-width: 414px) {
            .chat-frame {
                width: 100vw;
                height: 90vh;
                bottom: 0;
                right: 0;
                padding: 10px;
            }
        }

        @media (max-width: 375px) {
            .chat-frame {
                width: 100vw;
                height: 90vh;
                bottom: 0;
                right: 0;
                padding: 10px;
            }
        }

        @media (max-width: 360px) {
            .chat-frame {
                width: 100vw;
                height: 90vh;
                bottom: 0;
                right: 0;
                padding: 10px;
            }
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