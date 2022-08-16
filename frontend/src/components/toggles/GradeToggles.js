import React, { useState, useEffect } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function GradeToggles({ changeGradeState }) {
  const [toggleState, setToggleState] = useState("percentage");

  const theme = createTheme({
    palette: {
      primary: {
        light: "#00B5D137",
        main: "#00B5D1",
      },
    },
  });

  const handleChange = (event, newGradeState) => {
    setToggleState(newGradeState);
  };

  useEffect(() => {
    changeGradeState(toggleState);
  }, [toggleState]);

  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}
