import React from "react";
import Sections from "./Sections/Sections";

const Board = ({ name, board, classes }) => {
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
