import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
    },
  },

  typography: {
    fontFamily: ['Menlo'].join(','),
  },
});

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};

export default theme;
