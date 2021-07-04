import React from "react";
import Sections from "./Sections/Sections";

const Board = (props) => {
  let sections = null;

  if (props.board) {
    sections = (
      <div>
        <Sections
          nameKey={props.name + "-sections"}
          sections={props.board.sections}
        />
      </div>
    );
  }

  return <div className={props.classes}>{sections}</div>;
};

export default Board;
