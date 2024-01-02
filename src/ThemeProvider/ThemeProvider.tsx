import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  typography: {
    fontFamily: ['Menlo', 'sans-serif'].join(','),
    htmlFontSize: 10,
  },
  spacing: 1,
  palette: {
    primary: {
      main: '#535BF2',
    },
    secondary: {
      main: '#BFEB61',
    },
    background: {
      default: '#1A1A1A',
    },
    text: {
      primary: '#F1DAC4',
      secondary: '#2E2E2E',
    },
  },
});

theme = createTheme(theme, {
  components: {
    MuiInputLabel: {
      styleOverrides: {
        shrink: {
          transform: 'translate(14px, -9px)',
          paddingRight: '1rem',
          background: theme.palette.background.default,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
        },
      },
    },
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fieldset: {
            borderColor: '#E0E3E7',
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          '&.Mui-checked': {
            color: '#bfeb61',
          },
          '&.Mui-checked + .MuiSwitch-track': {
            backgroundColor: '#bfeb61',
          },
        },
        track: {
          backgroundColor: '#535bf2',
        },
      },
    },
  },
});

theme.typography.body1 = {
  fontFamily: 'Menlo',
  [theme.breakpoints.up('xs')]: {
    fontSize: '1.4rem',
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.6rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};

// theme.typography.h3 = {
//   fontSize: '1.8rem',
//   [theme.breakpoints.up('sm')]: {
//     fontSize: '2rem',
//   },
//   [theme.breakpoints.up('md')]: {
//     fontSize: '2.2rem',
//   },
// };

// theme.typography.h2 = {
//   fontSize: '2rem',
//   [theme.breakpoints.up('sm')]: {
//     fontSize: '2.2rem',
//   },
//   [theme.breakpoints.up('md')]: {
//     fontSize: '3rem',
//   },
// };

// theme.typography.h1 = {
//   fontSize: '2.2rem',
//   [theme.breakpoints.up('sm')]: {
//     fontSize: '2.4rem',
//   },
//   [theme.breakpoints.up('md')]: {
//     fontSize: '3.4rem',
//   },
// };

// theme = responsiveFontSizes(theme);

export default theme;
