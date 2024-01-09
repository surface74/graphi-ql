import React from 'react';
import errorMessages from '../../assets/errorMessages.json';
import { useDataContext } from '../../DataContext/useDataContext';
import { Typography } from '@mui/material';

const NotFoundPage: React.FC = () => {
  const { language } = useDataContext();
  return (
    <Typography variant="h4" textAlign={'center'}>
      {errorMessages.ERROR_404[language]}
    </Typography>
  );
};

export default NotFoundPage;
