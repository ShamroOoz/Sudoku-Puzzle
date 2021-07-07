import React from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
const DropMenu = () => {
  return (
    <div class="relative inline-flex">
      <ChevronDownIcon className="absolute top-0 right-0 w-2 h-2 m-4 pointer-events-none" />
      {/* class="" */}
      <select className="h-10 pl-5 pr-10 text-gray-600 bg-white border-2 border-indigo-500 rounded-full appearance-none hover:border-gray-400 focus:outline-none">
        <option>Choose a color</option>
        <option>Red</option>
        <option>Blue</option>
        <option>Yellow</option>
        <option>Black</option>
        <option>Orange</option>
        <option>Purple</option>
        <option>Gray</option>
        <option>White</option>
      </select>
    </div>
  );
};

export default DropMenu;
