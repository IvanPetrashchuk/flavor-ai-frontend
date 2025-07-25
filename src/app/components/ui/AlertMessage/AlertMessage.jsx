"use client";

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { TIME_FOR_ALERT } from "@constants/globals";

export default function AlertMessage({ message, type, id, onClose, showTime = TIME_FOR_ALERT }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          onClose(id);
        }
      }, showTime);

      return () => clearTimeout(timer);
    }
  }, [isVisible, id, onClose, showTime]);

  if (!isVisible) {
    return null;
  }

  const alertTypeClasses = {
    success: "bg-green-100 border-green-400 text-green-700",
    error: "bg-red-100 border-red-400 text-red-700",
    warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
    info: "bg-blue-100 border-blue-400 text-blue-700",
  };

  const currentAlertClass = alertTypeClasses[type] || alertTypeClasses.info;

  return (
    <div
      className={`relative px-4 py-3 rounded border shadow-md flex items-center justify-between transition-opacity duration-300 ease-in-out ${currentAlertClass}`}
      role="alert"
    >
      <div>
        <b className="font-bold">{type.charAt(0).toUpperCase() + type.slice(1)}!</b>{" "}
        <span className="block sm:inline">{message}</span>
      </div>
      <button
        type="button"
        className="ml-4 -mr-1 px-2 py-1 rounded-md text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        aria-label="Close"
        onClick={() => {
          setIsVisible(false);
          if (onClose) {
            onClose(id);
          }
        }}
      >
        <svg className="h-4 w-4 fill-current" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.414l-2.651 2.651a1.2 1.2 0 1 1-1.697-1.697L8.303 9.717 5.651 7.065a1.2 1.2 0 1 1 1.697-1.697L10 8.02l2.651-2.651a1.2 1.2 0 1 1 1.697 1.697L11.697 9.717l2.651 2.651a1.2 1.2 0 0 1 0 1.697z" />
        </svg>
      </button>
    </div>
  );
}

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
  id: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  showTime: PropTypes.number,
};

AlertMessage.defaultProps = {
  type: "info",
  showTime: TIME_FOR_ALERT,
};
