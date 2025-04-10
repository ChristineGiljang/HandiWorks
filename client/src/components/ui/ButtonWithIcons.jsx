import React from "react";

const ButtonWithIcons = ({ text, onClick, variant }) => {
  // Left Icon
  const leftIcon = () => {
    if (variant === "pro") {
      return (
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m20.9532 11.7634-2.0523-2.05225-2.0523 2.05225 2.0523 2.0523 2.0523-2.0523Zm-1.3681-2.73651-4.1046-4.10457L12.06 8.3428l4.1046 4.1046 3.4205-3.42051Zm-4.1047 2.73651-2.7363-2.73638-8.20919 8.20918 2.73639 2.7364 8.2091-8.2092Z"
          />
          <path
            stroke="currentColor"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m12.9306 3.74083 1.8658 1.86571-2.0523 2.05229-1.5548-1.55476c-.995-.99505-3.23389-.49753-3.91799.18657l2.73639-2.73639c.6841-.68409 1.9901-.74628 2.9229.18658Z"
          />
        </svg>
      );
    } else if (variant === "client") {
      return (
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white me-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeWidth="2"
            d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      );
    }
    return null;
  };

  // Right Arrow Icon (Shared for both buttons)
  const rightIcon = (
    <svg
      className="rtl:rotate-180 w-3.5 h-3.5 ms-2 " // Added focus:text-green-700 for focus effect
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5h12m0 0L9 1m4 4L9 9"
      />
    </svg>
  );

  // Button styles based on variant
  const buttonStyles = {
    pro: "text-gray-500 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-green-700 font-medium rounded-lg text-sm px-5 py-2.5 border border-gray-300 text-center inline-flex items-center ",
    client:
      "text-gray-500 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-green-700 font-medium rounded-lg text-sm px-5 py-2.5 border border-gray-300 text-center inline-flex items-center ",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${buttonStyles[variant]} me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
    >
      {/* Left Icon with spacing */}
      {leftIcon()}
      {/* Button Text with hover and focus effect */}
      <span className="group-hover:text-green-700 focus:text-green-700">
        {text}
      </span>{" "}
      {/* Added focus:text-green-700 for text color on focus */}
      {/* Right Icon with spacing */}
      {rightIcon}
    </button>
  );
};

export default ButtonWithIcons;
