import { signInWithEmailAndPassword } from 'firebase/auth';
import { CircularProgress, Box } from '@mui/material';

import { useDataContext } from '../../DataContext/useDataContext';
import UIStrings from '../../assets/UIStrings.json';
import { useLogin } from '../../hooks/login';
import { flexColomnCenter } from './styles';
import { auth } from '../../Components/Authority/firebase';
import LoginForm from '../../Components/LoginForm/LoginForm';
import { LoginFormType } from '../../Components/LoginForm/LoginForm.types';

const SignInPage = () => {
  const { language } = useDataContext();

  const [login, isLoading] = useLogin(async (emailProp, passwordProp) => {
    await signInWithEmailAndPassword(auth, emailProp, passwordProp);
  });

  const makeLogin = (email: string, password: string) => {
    login(email, password);
  };

  return (
    <>
      <Box sx={flexColomnCenter}>
        <LoginForm
          title={UIStrings.SignInPageTitle[language]}
          onSubmitForm={makeLogin}
          type={LoginFormType.LOGIN}
        />
        {isLoading && <CircularProgress color="inherit" />}
      </Box>
    </>
  );
};

export default SignInPage;
