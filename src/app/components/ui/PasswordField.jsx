// components/PasswordField.jsx
import React, { useState } from "react";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function PasswordField({
  labelText,
  htmlForName,
  typeInput = "text",
  placeholderText,
  classNameValue = "",
  error,
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = typeInput === "password";
  const actualInputType = isPasswordField && showPassword ? "text" : typeInput;
  const IconComponent = showPassword ? VisibilityIcon : VisibilityOffIcon;

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={`mb-4 ${classNameValue}`}>
      <label htmlFor={htmlForName} className="block text-gray-700 text-sm font-bold mb-1">
        {labelText}
      </label>
      <div className="relative">
        <input
          type={actualInputType}
          id={htmlForName}
          placeholder={placeholderText}
          className={`
            shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${error ? "border-red-500 pr-10" : ""} 
          `}
          {...rest}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={handleTogglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <IconComponent />
          </button>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${htmlForName}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}