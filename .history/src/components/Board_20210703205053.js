import React from "react";
import "./style.css";
// import Sections from "./Sections/Sections";

const Board = (props) => {
  let sections = null;

  if (props.board) {
    sections = (
      <div>
        {/* <Sections
          nameKey={props.name + "-sections"}
          sections={props.board.sections}
        /> */}
        seaction
      </div>
    );
  }

  return <div className={props.class}>{sections}</div>;
};

export default Board;
