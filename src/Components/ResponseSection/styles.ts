import { SxProps, Theme } from '@mui/material';
import theme from '../../ThemeProvider/ThemeProvider';

export const sectionRespContainer: SxProps<Theme> = {
  display: 'flex',
  width: '100%',
  height: '100%',
  background: '#2e3440',
};

export const buttonWrapperBasic: SxProps<Theme> = {
  position: 'absolute',
  marginTop: '1rem',
  top: 0,
};

export const buttonWrapper: SxProps<Theme> = {
  ...buttonWrapperBasic,
  right: '5rem',
};

export const buttonWrapperMobile: SxProps<Theme> = {
  ...buttonWrapperBasic,
  right: '3.3rem',
};

export const runBtn: SxProps<Theme> = {
  borderRadius: '0.5rem',
  width: { md: '4rem', sm: '3rem', xs: '2.4rem' },
  height: { md: '4rem', sm: '3rem', xs: '2.4rem' },
  padding: '0.0',
  background: theme.palette.text.primary,
  position: 'absolute',
  zIndex: 30,

  '&:hover': {
    bgcolor: '#f1ebe5',
  },
};
