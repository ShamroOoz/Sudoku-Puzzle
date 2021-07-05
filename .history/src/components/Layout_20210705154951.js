import React from "react";

const Layout = ({ children, label }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 bg-center bg-no-repeat bg-cover">
      <div className="grid w-4/5 p-10 mx-auto my-20 space-y-5 text-center border-4 border-indigo-600 shadow-2xl cursor-pointer sm:my-auto bg-white-600 bg-opacity-70 rounded-xl">
        <h1 class="text-4xl font-bold uppercase text-indigo-600 transition duration-500">
          Part {label}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default Layout;
