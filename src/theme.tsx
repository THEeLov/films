import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#242424',
    },
    secondary: {
      main: '#ff6464',
    },
    error: {
      main: red.A400,
    },
  },
});

export const addTextFieldStyle = {
  "& .MuiFilledInput-root": {
    backgroundColor: "#ff6464",
    color: "#242424",
    "&:hover": {
      backgroundColor: "#e55c5c",
    },
    "&.Mui-focused": {
      backgroundColor: "#ff6464",
    },
  },
  "& .MuiFormLabel-root": {
    color: "#242424",
  },
  "& .MuiFilledInput-underline:before": {
    borderBottomColor: "#ff6464",
  },
  "& .MuiFilledInput-underline:after": {
    borderBottomColor: "white",

  "& .Mui-error": {
    color: "#ff6464",
  },
}};

export const addCheckboxStyle = {
  color: "#ff6464", // Unchecked checkbox color
  "&.Mui-checked": {
  color: "#ff6464", // Checked checkbox color
  },
};

export default theme;