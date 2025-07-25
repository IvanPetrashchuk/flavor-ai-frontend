"use client";

import React, { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import AlertMessage from "./AlertMessage";

export default function AlertContainer() {
  const [messages, setMessages] = useState([]);

  const addMessage = useCallback((message, type = "info") => {
    const newMessage = {
      id: uuidv4(),
      message,
      type,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, []);

  const removeMessage = useCallback((id) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        zIndex: 1050,
        width: "auto",
        maxWidth: "400px",
      }}
    >
      {messages.map((msg) => (
        <AlertMessage
          key={msg.id}
          id={msg.id}
          message={msg.message}
          type={msg.type}
          onClose={removeMessage}
        />
      ))}
    </div>
  );
}
