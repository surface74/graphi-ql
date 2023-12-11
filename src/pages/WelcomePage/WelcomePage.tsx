import styles from './style.module.scss';

const WelcomePage: React.FC = () => {
  return (
    <>
      <h2 className={styles.title}>Welcome to GraphiQL</h2>
      <div className={styles['graphiql__container']}></div>
    </>
  );
};

export default WelcomePage;
