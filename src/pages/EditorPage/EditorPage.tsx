import React from 'react';
import styles from './style.module.scss';

const EditorPage: React.FC = () => {
  return (
    <>
      <h2 className={styles.title}>GraphiQL</h2>
      <div className={styles.graphiql__container}>
        <div className={styles['test-div']}></div>
      </div>
    </>
  );
};

export default EditorPage;
