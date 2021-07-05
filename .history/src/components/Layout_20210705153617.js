import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 bg-center bg-no-repeat bg-cover">
      <div className="grid w-4/5 p-10 mx-auto my-20 space-y-5 text-center border-4 border-indigo-600 shadow-2xl cursor-pointer place-items-center sm:my-auto bg-white-600 bg-opacity-70 rounded-xl">
        {children}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <a
            href="https://www.facebook.com/QuickToolz"
            title="Quicktoolz On Facebook"
            className="inline-flex items-center px-6 py-2 font-bold tracking-wide transition duration-500 border-2 border-indigo-500 rounded shadow-md md:w-32 hover:text-white hover:border-blue-600 hover:bg-blue-600"
          >
            <span className="mx-auto">Facebook</span>
          </a>

          <a
            href="https://twitter.com/quicktoolz"
            title="Quicktoolz On Twitter"
            className="inline-flex items-center px-6 py-2 font-bold tracking-wide transition duration-500 border-2 border-indigo-500 rounded shadow-md md:w-32 hover:text-white hover:border-blue-500 hover:bg-blue-500"
          >
            <span className="mx-auto">Twitter</span>
          </a>

          <a
            href="https://pinterest.com/quicktoolz/"
            title="Quicktoolz On Pinterest"
            className="inline-flex items-center px-6 py-2 font-bold tracking-wide transition duration-500 border-2 border-indigo-500 rounded shadow-md md:w-32 hover:text-white hover:border-red-600 hover:bg-red-600"
          >
            <span className="mx-auto">Pintrest</span>
          </a>

          <a
            href="https://www.reddit.com/user/quicktoolz/"
            title="Quicktoolz On Facebook"
            className="inline-flex items-center px-6 py-2 font-bold tracking-wide transition duration-500 border-2 border-indigo-500 rounded shadow-md md:w-32 hover:text-white hover:border-yellow-600 hover:bg-yellow-600"
          >
            <span className="mx-auto">Reddit</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Layout;
