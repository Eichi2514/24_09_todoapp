import { createTheme } from '@mui/material';
import { create } from '@mui/material/styles/createTransitions';

const theme = createTheme({
  typography: {
    fontFamily: 'GmarketSansMedium',
  },
  palette: {
    type: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#3f51b5',
    },
  },
});

export default theme;
