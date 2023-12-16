import { createUserWithEmailAndPassword } from 'firebase/auth';
import { CircularProgress, Box } from '@mui/material';

import { useDataContext } from '../../DataContext/useDataContext';
import UIStrings from '../../assets/UIStrings.json';
import { useLogin } from '../../hooks/login';
import { flexColomnCenter } from './styles';
import { auth } from '../../Components/Authority/firebase';
import LoginForm from '../../Components/LoginForm/LoginForm';
import { LoginFormType } from '../../Components/LoginForm/LoginForm.types';

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
      <LoginForm
        title={UIStrings.SignUpPageTitle[language]}
        onSubmitForm={makeSignUp}
        message={isError}
        type={LoginFormType.SIGNUP}
      />
      {isLoading && <CircularProgress color="inherit" />}
    </Box>
  );
};

export default SignUpPage;
