import theme from '../../ThemeProvider/ThemeProvider';

export const cardWrapper = (size: boolean) => {
  return {
    display: 'flex',
    flexDirection: size ? 'row' : 'column',
    gap: 20,
    p: 20,
    borderRadius: 4,
    transition: '0.3s',
    bgcolor: theme.palette.grey[900],
    '&:hover': {
      bgcolor: theme.palette.grey[800],
    },
  };
};

export const avatarStyles = (size: boolean) => {
  return {
    width: 120,
    height: 120,
    borderRadius: 4,
    alignSelf: size ? 'flex-start' : 'center',
  };
};

export const nameWrapper = { display: 'flex', gap: 10, alignItems: 'end' };
