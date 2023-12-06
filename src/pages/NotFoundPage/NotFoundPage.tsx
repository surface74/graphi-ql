import React from 'react';
import styles from './style.module.scss';
import errorMessages from '../../assets/errorMessages.json';

const NotFoundPage: React.FC = () => {
  return (
    <>
      <h2 className={styles.tytle}>{errorMessages.ERROR_404.en}</h2>
      <div className={styles['not-found-page__container']}></div>
    </>
  );
};

export default NotFoundPage;
