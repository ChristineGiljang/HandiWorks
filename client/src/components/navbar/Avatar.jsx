import React from "react";

const Avatar = ({ image, initials, size = "2" }) => {
  const sizeClass = `w-${size} h-${size}`; // This is problematic in Tailwind CSS
  const sizeValue = `${parseInt(size)}rem`; // To apply the size dynamically

  return (
    <div
      className={`flex items-center justify-center bg-gray-500 text-white rounded-full text-sm`}
      style={{ width: sizeValue, height: sizeValue }}
    >
      {image ? (
        <img
          src={image}
          alt="user avatar"
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span className="text-base font-bold">{initials}</span>
      )}
    </div>
  );
};

export default Avatar;
