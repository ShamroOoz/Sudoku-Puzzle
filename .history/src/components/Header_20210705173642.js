import React from "react";

const Header = () => {
  return (
    <nav className="flex flex-wrap items-center justify-between py-3 bg-white border-t-2 border-blue-700 border-solid shadow lg:px-12">
      <div className="mx-auto text-gray-800 ">
        <span className="text-xl font-semibold tracking-tight capitalize">
          Sdoku Puzzle
        </span>
      </div>
    </nav>
  );
};

export default Header;
