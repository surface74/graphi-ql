import { SxProps, Theme } from '@mui/material';

export const flexColomnCenter: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  p: { xs: 10, md: 30, sm: 20 },
  flex: '1 1 auto',
};
