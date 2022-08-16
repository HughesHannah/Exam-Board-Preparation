import React, { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function GradeToggles({ changeGradeState }) {
  const [toggleState, setToggleState] = useState("percentage");

  const handleChange = (event, newGradeState) => {
    setToggleState(newGradeState);
  };

  useEffect(() => {
    changeGradeState(toggleState);
  }, [toggleState]);

  return (
    <ToggleButtonGroup
      color="primary"
      value={toggleState}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton size="small" value="percentage">
        Percentage
      </ToggleButton>
      <ToggleButton size="small" value="band">
        Band
      </ToggleButton>
      <ToggleButton size="small" value="point">
        Point
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
