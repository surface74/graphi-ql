import { SxProps, Theme } from '@mui/material';
import theme from '../../ThemeProvider/ThemeProvider';

export const headerWrapper: SxProps<Theme> = {
  borderBottom: 1,
  borderColor: 'divider',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const arrowBtn: SxProps<Theme> = {
  background: theme.palette.primary.main,
  borderRadius: '50%',
  width: '2rem',
  height: '2rem',

  '&:hover': {
    bgcolor: theme.palette.primary.main,
  },
};

export const icon: SxProps<Theme> = {
  fontSize: '1.6rem',
  color: '#fff',
};
