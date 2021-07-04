import React from "react";
import SectionRow from "./SectionRow/SectionRow";

const Sections = ({ nameKey, sections }) => {
  return props.sections.map((sectionRow, sectionIndex) => {
    return (
      <div
        className="game-sections-row"
        key={props.nameKey + "-sections-" + sectionIndex}
      >
        <SectionRow
          nameKey={props.nameKey + "-sectionRow-" + sectionIndex}
          sectionRow={sectionRow}
        />
      </div>
    );
  });
};

export default Sections;
