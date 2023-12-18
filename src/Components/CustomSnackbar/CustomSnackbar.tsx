import { styled } from '@mui/material';
import { MaterialDesignContent } from 'notistack';

const CustomSnackbar = styled(MaterialDesignContent)(() => ({
  '&.notistack-MuiContent': {
    fontSize: '1.6rem',
  },
}));

export default CustomSnackbar;
