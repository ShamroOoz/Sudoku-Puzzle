import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 bg-center bg-no-repeat bg-cover">
      <div className="grid w-4/5 p-10 mx-auto my-20 space-y-5 text-center border-4 border-indigo-600 shadow-2xl cursor-pointer place-items-center sm:my-auto bg-white-600 bg-opacity-70 rounded-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="w-24 h-24 text-indigo-600"
          viewBox="0 0 16 16"
        >
          <path d="M4.968 9.75a.5.5 0 1 0-.866.5A4.498 4.498 0 0 0 8 12.5a4.5 4.5 0 0 0 3.898-2.25.5.5 0 1 0-.866-.5A3.498 3.498 0 0 1 8 11.5a3.498 3.498 0 0 1-3.032-1.75zM7 5.116V5a1 1 0 0 0-1-1H3.28a1 1 0 0 0-.97 1.243l.311 1.242A2 2 0 0 0 4.561 8H5a2 2 0 0 0 1.994-1.839A2.99 2.99 0 0 1 8 6c.393 0 .74.064 1.006.161A2 2 0 0 0 11 8h.438a2 2 0 0 0 1.94-1.515l.311-1.242A1 1 0 0 0 12.72 4H10a1 1 0 0 0-1 1v.116A4.22 4.22 0 0 0 8 5c-.35 0-.69.04-1 .116z" />
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-1 0A7 7 0 1 0 1 8a7 7 0 0 0 14 0z" />
        </svg>

        <h1 className="text-4xl font-bold text-indigo-600 uppercase transition duration-500">
          Coming Soon
        </h1>
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
