import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { CircularProgress, Box } from '@mui/material';

import { useDataContext } from '../../DataContext/useDataContext';
import UIStrings from '../../assets/UIStrings.json';
import { useLogin } from '../../hooks/login';
import { flexColomnCenter } from './styles';
import { auth } from '../../Components/Authority/firebase';
import AuthForm from '../../Components/AuthForm/AuthForm';
import { FC } from 'react';
import { AuthActionType, IAuthPageProps } from './AuthPage.types';

const AuthPage: FC<IAuthPageProps> = ({ authActionType }) => {
  const { language } = useDataContext();

  const [authAction, isLoading] = useLogin(async (emailProp, passwordProp) => {
    authActionType === AuthActionType.LOGIN
      ? await signInWithEmailAndPassword(auth, emailProp, passwordProp)
      : await createUserWithEmailAndPassword(auth, emailProp, passwordProp);
  });

  const formTitle =
    authActionType === AuthActionType.LOGIN
      ? UIStrings.SignInPageTitle[language]
      : UIStrings.SignUpPageTitle[language];

  return (
    <>
      <Box sx={flexColomnCenter}>
        <AuthForm
          title={formTitle}
          onSubmitForm={authAction}
          type={authActionType}
        />
        {isLoading && <CircularProgress color="inherit" />}
      </Box>
    </>
  );
};

export default AuthPage;
