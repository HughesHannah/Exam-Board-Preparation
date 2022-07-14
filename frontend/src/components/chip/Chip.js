import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function ClickableChips() {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <Stack direction="row" spacing={2}>
      <Chip label="Cohort 1" onClick={handleClick} />
      <Chip label="Cohort 2" onClick={handleClick} />
      <Chip label="Cohort 3" onClick={handleClick} />
      <Chip label="Cohort 4" onClick={handleClick} />
      <Chip label="Cohort 5" onClick={handleClick} />
    </Stack>
  );
}
