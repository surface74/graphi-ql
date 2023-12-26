import { SxProps, Theme } from '@mui/material';
import theme from '../../ThemeProvider/ThemeProvider';

export const flexRowCenter: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: theme.palette.secondary.light,
};

export const wrapperBaseUrl: SxProps<Theme> = {
  ...flexRowCenter,
  width: '100%',
  gap: '2rem',
};

export const endpointField: SxProps<Theme> = {
  border: `1px solid ${theme.palette.primary.light}`,
  borderRadius: '0.5rem',
};

const baseBtn: SxProps<Theme> = {
  borderRadius: '0.5rem',
  width: '5rem',
  height: '4rem',
  padding: '0.0',
};

export const submitButton: SxProps<Theme> = {
  ...baseBtn,
  background: theme.palette.secondary.light,

  '&:hover': {
    bgcolor: theme.palette.secondary.main,
  },
};

export const openDocsButton: SxProps<Theme> = {
  ...baseBtn,
  width: '10rem',
  background: theme.palette.primary.light,
  '&:hover': {
    bgcolor: theme.palette.primary.main,
  },
};
