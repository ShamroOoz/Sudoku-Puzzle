import React from "react";
import Sections from "./Sections/Sections";

const Board = ({ board, name, classes }) => {
  let sections = null;

  if (board) {
    sections = (
      <div>
        <Sections nameKey={name + "-sections"} sections={board.sections} />
      </div>
    );
  }

  return <div className={classes}>{sections}</div>;
};

export default Board;
