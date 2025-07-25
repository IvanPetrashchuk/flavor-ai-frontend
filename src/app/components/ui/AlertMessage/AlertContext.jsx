"use client";

import React, { createContext, useState, useCallback, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AlertMessage from './AlertMessage';

const AlertContext = createContext(null);

export function AlertProvider({ children }) {
  const [messages, setMessages] = useState([]);

  const addAlert = useCallback((message, type = 'info') => {
    const newMessage = {
      id: uuidv4(),
      message,
      type,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, []);

  const removeAlert = useCallback((id) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
  }, []);

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      <div
        className="fixed top-5 right-5 z-[1050] w-auto max-w-lg flex flex-col gap-2 p-2"
      >
        {messages.map((msg) => (
          <AlertMessage
            key={msg.id}
            id={msg.id}
            message={msg.message}
            type={msg.type}
            onClose={removeAlert}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
}