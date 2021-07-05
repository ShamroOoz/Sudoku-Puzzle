import React from "react";

const Loading = () => {
  return (
    <div className="fixed top-0 left-0 z-50  w-full h-full bg-[#0008] text-white opacity-75 loading">
      <svg width="205" height="250" viewBox="0 0 40 50">
        <polygon
          strokeWidth="1"
          stroke="#fff"
          fill="none"
          points="20,1 40,40 1,40"
        />
        <text fill="#fff" x="5" y="47">
          Loading
        </text>
      </svg>
    </div>
  );
};

export default Loading;
