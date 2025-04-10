import React, { useState } from "react";

const NavbarLogo = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 p-2.5">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 relative">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            HandiWorks
          </span>
        </a>
      </div>
    </nav>
  );
};

export default NavbarLogo;
