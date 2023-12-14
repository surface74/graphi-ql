import { createUserWithEmailAndPassword } from 'firebase/auth';
import { CircularProgress, Box } from '@mui/material';

import { useDataContext } from '../../DataContext/useDataContext';
import AuthForm from '../../Components/AuthForm/AuthForm';
import UIStrings from '../../assets/UIStrings.json';
import { useLogin } from '../../hooks/login';
import { flexColomnCenter } from './styles';
import { auth } from '../../Components/Authority/firebase';

const SignUpPage = () => {
  const { language } = useDataContext();

  const [signup, isLoading, isError] = useLogin(
    async (emailProp, passwordProp) => {
      await createUserWithEmailAndPassword(auth, emailProp, passwordProp);
    }
  );

  const makeSignUp = (email: string, password: string) => {
    signup(email, password);
  };

  return (
    <Box sx={flexColomnCenter}>
      <AuthForm
        title={UIStrings.SignUpPageTitle[language]}
        handleClick={makeSignUp}
        message={isError}
        type="singup"
      />
      {isLoading && <CircularProgress color="inherit" />}
    </Box>
  );
};

export default SignUpPage;
