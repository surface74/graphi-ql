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
          transform: 'translate(14px, -15px)',
          paddingRight: '1rem',
          background: theme.palette.background.default,
        },
        root: {
          color: '#E0E3E7',
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

export default theme;
