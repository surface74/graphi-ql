import { SxProps, Theme } from '@mui/material';
import theme from '../../ThemeProvider/ThemeProvider';

export const sectionRespContainer: SxProps<Theme> = {
  display: 'flex',
  width: '100%',
  height: '100%',
  background: '#2e3440',
};

export const runBtn: SxProps<Theme> = {
  borderRadius: '0.5rem',
  width: { md: '4rem', sm: '3rem', xs: '2.4rem' },
  height: { md: '4rem', sm: '3rem', xs: '2.4rem' },
  padding: '0.0',
  background: theme.palette.text.primary,
  position: 'absolute',
  zIndex: 30,
  right: 10,

  '&:hover': {
    bgcolor: '#f1ebe5',
  },
};
