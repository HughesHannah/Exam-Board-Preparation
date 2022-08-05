import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { variables } from "../../Variables";
import { useParams, useNavigate } from "react-router-dom";

export default function DegreePicker() {
  const [degree, setDegree] = useState("");
  let [degrees, setDegrees] = useState([]);

  const navigate = useNavigate()

  const path = useParams();
  let currentDegree = path.degree;

//   useEffect(() => {
//     getYears();
//   }, []);

//   let getYears = async () => {
//     let response = await fetch(variables.API_URL + "yearsAPI", {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     let data = await response.json();
//     setYears(data);
//   };

  const handleChange = event => {
    setDegree(event.target.value);
    navigate("/classification/" + event.target.value)
    window.location.reload()
  };
  

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel >Degree</InputLabel>
        <Select
          id="degree-select"
          value={degree}
          onChange={handleChange}
          label="Degree"
        >
        <MenuItem value={"Computing Science"}>Computing Science</MenuItem>
        <MenuItem value={"Software Engineering"}>SoftwareEngineering</MenuItem>
        </Select>
      </FormControl>
    </div> 
  );
}
