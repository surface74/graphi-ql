import { SxProps, Theme } from '@mui/material';

export const wrapperAppBar: SxProps<Theme> = {
  backgroundColor: '#1a1a1a',
  flex: '0 0 auto',
};

export const wrapperFooterBox: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  gap: 2,
  justifyContent: 'center',
  alignItems: 'center',
  p: 1,
};

export const githubIcon: SxProps<Theme> = {
  width: 50,
  height: 80,
  color: '#eee',
};

export const yearTitle: SxProps<Theme> = {
  color: '#eee',
  fontStyle: 'normal',
  textAlign: 'center',
  fontSize: '1rem',
};
