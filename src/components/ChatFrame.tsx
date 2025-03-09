"use client"
import { initChatbot } from 'dxchatbot-widget';
import React, { useEffect } from 'react'

const ChatFrame = () => {
  useEffect(() => {
    initChatbot({
      domainId: "113fccaa-5ab7-4425-9e95-69945061e865",
      domain: "https://askmylo-updated.vercel.app",
      position: {
        bottom: "50px", // Optional: defaults to '50px'
        right: "50px", // Optional: defaults to '50px'
      },
    });
  }, []);
  return (
    <div>
      
    </div>
  )
}

export default ChatFrame
