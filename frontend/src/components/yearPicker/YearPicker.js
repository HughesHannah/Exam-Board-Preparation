import React, {useState, useEffect} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { variables } from "../../Variables";

export default function SelectVariants() {
  const [year, setYear] = useState('');
  let [years, setYears] = useState([]);

  useEffect(() => {
    getYears();
  }, []);

  let getYears = async () => {
    let response = await fetch(variables.API_URL + "yearsAPI", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    setYears(data);
  };

  const handleChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={year}
          onChange={handleChange}
          label="Year"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
            {years.map((eachYear) => (
              <MenuItem key={eachYear.id}>{eachYear.yearStart} - {eachYear.yearEnd}</MenuItem>
            ))}

        </Select>
      </FormControl>
    </div>
  );
}
