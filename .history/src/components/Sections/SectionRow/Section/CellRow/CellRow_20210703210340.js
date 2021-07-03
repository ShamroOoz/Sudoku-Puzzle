import React from "react";
import "../../../../../App.css";
import Cell from "./Cell/Cell";

const CellRow = (props) => {
  return props.cells.map((cell) => {
    return <Cell class="game-cell" key={cell.key} cell={cell} />;
  });
};

export default CellRow;
