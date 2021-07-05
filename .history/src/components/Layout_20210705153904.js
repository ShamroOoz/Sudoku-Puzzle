import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 bg-center bg-no-repeat bg-cover">
      <div className="grid w-full p-10 mx-auto my-20 space-y-5 text-center border-4 border-indigo-600 shadow-2xl cursor-pointer place-items-center sm:my-auto bg-white-600 bg-opacity-70 rounded-xl">
        {children}
      </div>
    </div>
  );
};

export default Layout;
