import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Menlo'].join(','),
    htmlFontSize: 10,
  },
  spacing: 1,
  palette: {
    primary: {
      main: '#535bf2',
    },
    secondary: {
      main: '#bfeb61',
    },
    background: {
      default: '#1A1A1A',
    },
    text: {
      primary: '#F1DAC4',
      secondary: '#2E2E2E',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '1.6rem',
          textTransform: 'none',
          borderRadius: '10',
          focusVisible: {
            outline: 'none',
          },
        },
      },
    },
  },
});

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.4rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};

theme.typography.h2 = {
  fontSize: '1.8rem',
  '@media (min-width:600px)': {
    fontSize: '1.6rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.8rem',
  },
};

theme.typography.h1 = {
  fontSize: '2.4rem',
  '@media (min-width:600px)': {
    fontSize: '1.8rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '3.2rem',
  },
};

export default theme;
