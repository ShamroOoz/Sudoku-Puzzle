import React from "react";
import "../../../../../App.css";
import Cell from "./Cell/Cell";

const CellRow = ({ cells }) => {
  console.log(cells);
  return cells.map((cell) => (
    <Cell classes="game-cell" key={cell.key} cell={cell} />
  ));
};

export default CellRow;
