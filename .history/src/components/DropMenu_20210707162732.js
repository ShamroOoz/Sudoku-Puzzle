import React from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { DIFFICULTY } from "../services/Constants";
const DropMenu = () => {
  return (
    <div className="relative inline-flex">
      <ChevronDownIcon className="absolute top-0 right-0 w-2 h-2 m-4 text-indigo-500 pointer-events-none" />

      <select className="h-10 pl-5 pr-10 text-gray-600 bg-white border-2 border-indigo-500 rounded-full appearance-none hover:border-blue-600 focus:outline-none">
        <option>Choose Difficulty</option>
        {DIFFICULTY.map((val) => (
          <option>{val}</option>
        ))}
      </select>
    </div>
  );
};

export default DropMenu;
