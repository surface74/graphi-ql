import { SxProps, Theme } from '@mui/material';

const flexColomnCenter = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

const flexRowCenter = {
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
  color: '#eee',
  textAlign: 'center',
};

export const wrapperAuth: SxProps<Theme> = {
  ...flexColomnCenter,
  gap: 10,
};
export const wrapperButtons: SxProps<Theme> = {
  ...flexRowCenter,
  gap: 20,
  pb: 30,
  pt: 30,
};

export const wrapperMainSection: SxProps<Theme> = {
  ...flexColomnCenter,
  borderRadius: 5,
  border: 2,
  borderColor: '#eee',
  gap: 20,
  p: 30,
};

export const welcomeSubTitle: SxProps<Theme> = {
  color: '#eee',
  textAlign: 'left',
};
