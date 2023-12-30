import { SxProps, Theme } from '@mui/material';
import theme from '../../ThemeProvider/ThemeProvider';

const flexColomnCenter = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const flexRowRight = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'end',
  alignItems: 'center',
};

export const flexRowCenter = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
};

export const welcomeHeading = {
  color: 'primary',
  textAlign: 'center',
  pb: 10,
};

export const welcomeTitle: SxProps<Theme> = {
  color: theme.palette.text.primary,
  textAlign: 'center',
};

export const wrapperAuth: SxProps<Theme> = {
  ...flexColomnCenter,
  gap: 10,
};
export const wrapperButtons: SxProps<Theme> = {
  ...flexRowRight,
  width: '100%',
  gap: 20,
  pb: 30,
  pt: 30,
};

export const wrapperMainSection: SxProps<Theme> = {
  ...flexColomnCenter,
  borderRadius: 5,
  border: 2,
  borderColor: theme.palette.text.primary,
  gap: 20,
  p: { xs: 10, md: 30, sm: 20 },
};

export const welcomeSubTitle: SxProps<Theme> = {
  color: theme.palette.text.primary,
  textAlign: 'left',
};
