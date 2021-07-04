import React from "react";
import "../../../App.css";
import Section from "./Section/Section";

const sectionRow = ({ sectionRow, nameKey }) => {
  return sectionRow.map((section) => (
    <div className="game-section" key={nameKey + "-" + section.key}>
      <Section
        nameKey={nameKey + "-section-" + section.key}
        cellRows={section.cellRows}
      />
    </div>
  )
};

export default sectionRow;
