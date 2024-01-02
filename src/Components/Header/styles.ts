import { SxProps, Theme } from '@mui/material';
import theme from '../../ThemeProvider/ThemeProvider';

export const flexRowCenter: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  paddingX: 10,
};

export const wrapperAppBar: SxProps<Theme> = {
  ...flexRowCenter,
  gap: 10,
};

export const logoIcon: SxProps<Theme> = {
  display: { xs: 'none', md: 'flex' },
  color: theme.palette.text.primary,
  mr: 1,
};

export const logoIconMobile: SxProps<Theme> = {
  display: { xs: 'flex', md: 'none' },
  mr: 1,
  color: theme.palette.text.primary,
};

export const logoTitle: SxProps<Theme> = {
  mr: 2,
  display: { xs: 'none', md: 'flex' },
  fontWeight: 700,
  letterSpacing: '.3rem',
  textDecoration: 'none',
  color: theme.palette.text.primary,
};

export const logoTitleMobile: SxProps<Theme> = {
  mr: 2,
  display: { sm: 'flex', xs: 'none', md: 'none' },
  flexGrow: 1,
  fontWeight: 700,
  letterSpacing: '.3rem',
  textDecoration: 'none',
  color: theme.palette.text.primary,
};

export const mobileMenuWrapper: SxProps<Theme> = {
  display: { xs: 'flex', md: 'none' },
  color: theme.palette.text.primary,
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
  // display: { xs: 'flex' },
  justifyContent: 'center',
  alignItems: 'center',
  display: { xs: 'none', sm: 'none', md: 'flex' },
};

export const iconBtnStyle: SxProps<Theme> = {
  p: '0',
};

export const loginIcon: SxProps<Theme> = {
  color: theme.palette.text.primary,
};

export const menu: SxProps<Theme> = {
  display: { xs: 'block', md: 'none' },
  color: theme.palette.text.primary,
};

export const pageButton: SxProps<Theme> = {
  my: 2,
  color: 'black',
  display: 'block',
};

export const langStyle: SxProps<Theme> = {
  color: theme.palette.text.primary,
  textAlign: 'center',
};
