import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 bg-center bg-no-repeat bg-cover">
      <div className="">{children}</div>
    </div>
  );
};

export default Layout;
