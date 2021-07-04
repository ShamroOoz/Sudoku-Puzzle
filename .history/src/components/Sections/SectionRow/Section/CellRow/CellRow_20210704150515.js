import React from "react";
import "../../../../../App.css";
import Cell from "./Cell/Cell";

const CellRow = ({ cells }) => {
  return cells.map((cell) =>(
     <Cell class="game-cell" key={cell.key} cell={cell} />;
  ));
};

export default CellRow;
