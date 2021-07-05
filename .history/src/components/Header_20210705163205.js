import React from "react";
import "../App.css";

const Header = () => {
  return (
    <nav class="flex items-center justify-between flex-wrap bg-white py-3 lg:px-12 shadow border-solid border-t-2 border-blue-700">
      <div class="flex items-center justify-center flex-shrink-0 text-gray-800 mr-16">
        <span class="font-semibold text-xl tracking-tight">My Navbar</span>
      </div>
    </nav>
  );
};

export default Header;
