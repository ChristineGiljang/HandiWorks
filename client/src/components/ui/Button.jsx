import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  text,
  variant = "outline",
  onClick,
  className = "",
  href,
  type = "button",
}) => {
  const baseStyles =
    "focus:outline-none font-medium rounded-lg text-sm px-5 py-2 me-2 transition duration-200";

  const outlineStyles =
    "text-green-700 border border-green-700 hover:text-white hover:bg-green-800 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800";

  const filledStyles =
    "bg-green-700 text-white hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800";

  const buttonStyles = variant === "outline" ? outlineStyles : filledStyles;

  // If href is provided → render Link
  if (href) {
    return (
      <Link to={href} className={`${baseStyles} ${buttonStyles} ${className}`}>
        {text}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${buttonStyles} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
