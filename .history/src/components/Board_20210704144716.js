import React from "react";
import Sections from "./Sections/Sections";

const Board = ({ name, board, classes }) => {
  let sections = board ? (
    <div>
      <Sections nameKey={name + "-sections"} sections={board?.sections} />
    </div>
  ) : null;

  return <div className={classes}>{sections}</div>;
};

export default Board;
