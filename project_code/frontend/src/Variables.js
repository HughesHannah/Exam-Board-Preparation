import { createTheme } from "@mui/material/styles";

export const variables = {
  API_URL: "http://127.0.0.1:8000/",
};

export const theme = createTheme({
  palette: {
    primary: {
      light: "#00B5D137",
      main: "#00B5D1",
    },
  },
});
