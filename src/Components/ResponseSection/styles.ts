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
  width: '4rem',
  height: '4rem',
  padding: '0.0',
  background: theme.palette.text.primary,
  position: 'absolute',
  zIndex: 30,
  left: -30,

  '&:hover': {
    bgcolor: '#f1ebe5',
  },
};
