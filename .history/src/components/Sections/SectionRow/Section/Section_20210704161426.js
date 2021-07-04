import React from "react";
import CellRow from "./CellRow/CellRow";

const Section = ({ cellRows, nameKey }) => {
  return cellRows.map((cellRow, index) => (
    <div className="section-row" key={nameKey + "-cellRow-" + index}>
      <CellRow
        class="cell-row"
        nameKey={nameKey + "-cellRow-" + index}
        cells={cellRow}
      />
    </div>
  ));
};

export default Section;
