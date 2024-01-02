import { SxProps, Theme } from '@mui/material';
import theme from '../../ThemeProvider/ThemeProvider';

const baseBtn: SxProps<Theme> = {
  borderRadius: '0.5rem',
  width: { md: '4rem', sm: '3rem', xs: '2.4rem' },
  height: { md: '4rem', sm: '3rem', xs: '2.4rem' },
  padding: '0.0',
};

export const sectionContainer: SxProps<Theme> = {
  display: 'flex',
  width: '100%',
  height: '100%',
  position: 'relative',
};

export const wrappwerTextEditor: SxProps<Theme> = {
  background: '#2e3440',
  color: 'black',
  width: '100%',
  height: '100%',
  textAlign: 'left',
  overflowY: 'auto',
};

export const prettifyBtn: SxProps<Theme> = {
  ...baseBtn,
  background: theme.palette.primary.light,
  '&:hover': {
    bgcolor: theme.palette.primary.main,
  },
};

export const cleanBtn: SxProps<Theme> = {
  ...baseBtn,
  background: theme.palette.secondary.light,

  '&:hover': {
    bgcolor: theme.palette.secondary.main,
  },
};

export const btnsWrapper: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'flex-start',
  gap: 5,
  height: '100%',
  position: 'absolute',
  right: 0,
  top: 0,
};
