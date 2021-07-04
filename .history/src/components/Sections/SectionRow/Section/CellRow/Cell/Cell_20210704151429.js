import React from "react";
import "./style.css";

const Cell = ({ cell, classes }) => {
  const cellValue = cell?.value === "." ? "." : cell.value;
  return (
    <div className={classes} key={cell.key}>
      <div className="cell-value">{cellValue}</div>
    </div>
  );
};

export default Cell;
