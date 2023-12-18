import { SxProps, Theme } from '@mui/material';

export const flexRowCenter: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  paddingX: 5,
};

export const wrapperAppBar: SxProps<Theme> = {
  ...flexRowCenter,
  gap: 10,
};

export const logoIcon: SxProps<Theme> = {
  display: { xs: 'none', md: 'flex' },
  mr: 1,
};

export const logoIconMobile: SxProps<Theme> = {
  display: { xs: 'flex', md: 'none' },
  mr: 1,
};

export const logoTitle: SxProps<Theme> = {
  mr: 2,
  display: { xs: 'none', md: 'flex' },
  fontWeight: 700,
  letterSpacing: '.3rem',
  textDecoration: 'none',
};

export const logoTitleMobile: SxProps<Theme> = {
  mr: 2,
  display: { xs: 'flex', md: 'none' },
  flexGrow: 1,
  fontFamily: 'menlo',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'inherit',
  textDecoration: 'none',
};

export const mobileMenuWrapper: SxProps<Theme> = {
  flexGrow: 1,
  display: { xs: 'flex', md: 'none' },
};

export const navWrapper: SxProps<Theme> = {
  flexGrow: 1,
  display: { xs: 'none', md: 'flex' },
  gap: 2,
};

export const rightMenuWrapper: SxProps<Theme> = {
  flexGrow: 1,
  display: {
    xs: 'flex',
    justifyContent: 'flex-end',
    gap: '2rem',
  },
};

export const switchLangWrapper: SxProps<Theme> = {
  display: { xs: 'flex' },
  justifyContent: 'center',
  alignItems: 'center',
};

export const loginIcon: SxProps<Theme> = {
  color: 'white',
};
