import React from "react";
import SectionRow from "./SectionRow/SectionRow";

const Sections = ({ nameKey, sections }) => {
  return sections.map((sectionRow, sectionIndex) => (
    <div
      className="game-sections-row"
      key={nameKey + "-sections-" + sectionIndex}
    >
      <SectionRow
        nameKey={nameKey + "-sectionRow-" + sectionIndex}
        sectionRow={sectionRow}
      />
    </div>
  ));
};

export default Sections;
