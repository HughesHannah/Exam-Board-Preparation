import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

import "./chip.scss";

export default function ClickableChips() {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  return (
    <div>
      <Stack className="chips" direction="row" spacing={2}>
        <Chip label="All" onClick={handleClick} />
        <Chip label="Computing Science" onClick={handleClick} />
        <Chip label="Software Engineering" onClick={handleClick} />
        <Chip label="Combined Honours" onClick={handleClick} />
      </Stack>
      <Stack className="chips" direction="row" spacing={2}>
      <Chip label="Infomatics" onClick={handleClick} />
        <Chip
          label="Electronics and Software Engineering"
          onClick={handleClick}
        />
      </Stack>
    </div>
  );
}
