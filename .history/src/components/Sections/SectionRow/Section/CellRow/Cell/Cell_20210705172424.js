import React from "react";
import "../App.css";

const Cell = ({ cell, classes }) => {
  const cellValue = cell?.value === "." ? "\u00A0" : cell.value;
  return (
    <div className={classes} key={cell.key}>
      <div className="cell-value">{cellValue}</div>
    </div>
  );
};

export default Cell;
