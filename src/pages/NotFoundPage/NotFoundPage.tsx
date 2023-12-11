import React from 'react';
import styles from './style.module.scss';
import errorMessages from '../../assets/errorMessages.json';
import { useDataContext } from '../../DataContext/useDataContext';

const NotFoundPage: React.FC = () => {
  const { language } = useDataContext();
  return (
    <>
      <h2 className={styles.title}>{errorMessages.ERROR_404[language]}</h2>
      <div className={styles['not-found-page__container']}></div>
    </>
  );
};

export default NotFoundPage;
