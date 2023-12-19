import { SxProps, Theme } from '@mui/material';
import theme from '../../ThemeProvider/ThemeProvider';

const baseBtn: SxProps<Theme> = {
  borderRadius: '0.5rem',
  width: '4rem',
  height: '4rem',
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
  overflowY: 'scroll',
};

export const prettifyBtn: SxProps<Theme> = {
  ...baseBtn,
  background: theme.palette.primary.light,
  '&:hover': {
    bgcolor: theme.palette.primary.main,
  },
};

export const runBtn: SxProps<Theme> = {
  ...baseBtn,
  background: theme.palette.text.primary,

  '&:hover': {
    bgcolor: '#f1ebe5',
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
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  gap: 5,
  height: '100%',
  position: 'absolute',
  right: '0.5rem',
};
