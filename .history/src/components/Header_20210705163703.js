import React from "react";
import "../App.css";

const Header = () => {
  return (
    <nav class="flex items-center justify-between flex-wrap bg-black py-3 lg:px-12 shadow border-solid border-t-2 border-blue-700">
      <div class="  mx-auto">
        <span class="font-semibold text-xl tracking-tight capitalize">
          Sudoku Game
        </span>
      </div>
    </nav>
  );
};

export default Header;
