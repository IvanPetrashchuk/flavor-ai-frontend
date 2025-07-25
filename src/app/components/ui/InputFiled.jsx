import React from "react";

export default function InputFiled({
  labelText,
  htmlForName,
  typeInput,
  placeholderText,
  error,
  value,
  classNameInputFiled = "",
  ...rest
}) {
  return (
    <div className={classNameInputFiled}>
      <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor={htmlForName}>
        {labelText}
      </label>
      <div className="relative">
        <input
          type={typeInput}
          className={`
            shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
            focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${error ? "border-red-500" : ""} 
          `}
          id={htmlForName}
          placeholder={placeholderText}
          value={value}
          {...rest}
        />

        {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
      </div>
    </div>
  );
}
