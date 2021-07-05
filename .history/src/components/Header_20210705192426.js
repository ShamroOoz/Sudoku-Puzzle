import React from "react";
import { EmojiHappyIcon } from "@heroicons/react/solid";

const Header = () => {
  return (
    <nav className="flex flex-wrap py-3 bg-white border-t-2 border-blue-700 border-solid shadow lg:px-12">
      <div className="mx-auto text-gray-800 ">
        <span className="flex items-center justify-center text-xl font-semibold tracking-tight capitalize ">
          <EmojiHappyIcon className="w-5 h-5 mr-3 text-blue-700" />
          Sdoku Puzzle
          <EmojiHappyIcon className="w-5 h-5 ml-3 text-blue-700" />
        </span>
      </div>
    </nav>
  );
};

export default Header;
