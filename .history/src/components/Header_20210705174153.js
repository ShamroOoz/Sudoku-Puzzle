import React from "react";
import { BellIcon } from "@heroicons/react/solid";

const Header = () => {
  return (
    <nav className="flex flex-wrap py-3 bg-white border-t-2 border-blue-700 border-solid shadow lg:px-12">
      <div className="mx-auto text-gray-800 ">
        <span className="flex text-xl font-semibold tracking-tight capitalize ">
          Sdoku Puzzle
          <BellIcon className="w-5 h-5 mr-3 text-green-500" />
        </span>
      </div>
    </nav>
  );
};

export default Header;
