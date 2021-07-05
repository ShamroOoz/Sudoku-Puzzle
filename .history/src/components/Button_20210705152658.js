import React from "react";

const Button = ({ label }) => {
  return (
    <button className="inline-flex items-center px-6 py-2 font-bold tracking-wide transition duration-500 border-2 border-indigo-500 rounded shadow-md md:w-32 hover:text-white hover:border-blue-600 hover:bg-blue-600">
      <span className="mx-auto">{label}</span>
    </button>
  );
};

export default Button;
