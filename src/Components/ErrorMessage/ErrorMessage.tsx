import Strings from '../../assets/errorMessages.json';
import styles from './ErrorMessage.module.css';
import { useDataContext } from '../../DataContext/useDataContext';

const ErrorMessage = () => {
  const { language } = useDataContext();
  return (
    <div className={styles.error__message}>
      {Strings.ERROR_MESSAGE[language]}
    </div>
  );
};

export default ErrorMessage;
