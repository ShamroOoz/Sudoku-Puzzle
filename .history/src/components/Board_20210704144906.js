import React from "react";
import Sections from "./Sections/Sections";

const Board = ({ name, board, classes }) => {
  console.log(board);
  return (
    <div className={classes}>
      {board && (
        <div>
          <Sections nameKey={name + "-sections"} sections={board?.sections} />
        </div>
      )}
    </div>
  );
};

export default Board;
