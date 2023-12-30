export const cardWrapper = (size: boolean) => {
  return {
    display: 'flex',
    flexDirection: size ? 'row' : 'column',
    gap: 20,
    p: 20,
    borderRadius: 4,
    transition: '0.3s',
    bgcolor: '#373535',
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
