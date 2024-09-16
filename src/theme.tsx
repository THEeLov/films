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

export default theme;