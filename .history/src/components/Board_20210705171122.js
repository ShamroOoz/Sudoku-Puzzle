import React from "react";
import Sections from "./Sections/Sections";

const Board = ({ name, board }) => {
  return (
    <>
      {board && (
        <div>
          <Sections nameKey={name + "-sections"} sections={board?.sections} />
        </div>
      )}
    </>
  );
};

export default Board;
