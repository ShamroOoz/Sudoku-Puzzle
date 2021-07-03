import React from "react";
import CellRow from "./CellRow/CellRow";

const Section = (props) => {
  return props.cellRows.map((cellRow, index) => {
    return (
      <div className="section-row" key={props.nameKey + "-cellRow-" + index}>
        <CellRow
          class="cell-row"
          nameKey={props.nameKey + "-cellRow-" + index}
          cells={cellRow}
        />
      </div>
    );
  });
};

export default Section;
