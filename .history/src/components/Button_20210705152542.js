import React from "react";

const Button = ({ title }) => {
  return (
    <button className="inline-flex items-center px-6 py-2 font-bold tracking-wide transition duration-500 border-2 border-indigo-500 rounded shadow-md md:w-32 hover:text-white hover:border-yellow-600 hover:bg-yellow-600">
      {title}
    </button>
  );
};

export default Button;
