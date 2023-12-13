import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { CircularProgress, Box } from '@mui/material';

import { setUser } from '../../store/slices/userSlice';
import { useAppDispatch } from '../../hooks/store';
import { useDataContext } from '../../DataContext/useDataContext';
import AuthForm from '../../Components/AuthForm/AuthForm';
import UIStrings from '../../assets/UIStrings.json';
import { pageName } from '../../common-types/common-types';
import { useLogin } from '../../hooks/login';
import { flexColomnCenter } from './styles';

const SignUpPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { language } = useDataContext();
  const auth = getAuth();

  const [signup, isLoading, isError] = useLogin(
    async (authProp, emailProp, passwordProp) => {
      const userCredential = await createUserWithEmailAndPassword(
        authProp,
        emailProp,
        passwordProp
      );
      const { email, uid } = userCredential.user;
      const idToken = await userCredential.user.getIdToken();

      dispatch(
        setUser({
          user: {
            email: email ?? '',
            id: uid,
            token: idToken,
          },
        })
      );
      navigate(`/${pageName.editor.En}`);
      console.log('email, uid, idToken: ', email, uid, idToken);
    }
  );

  const makeSignUp = (email: string, password: string) => {
    signup(auth, email, password);
  };

  // const makeSignUp = (email: string, password: string) => {
  //   const auth = getAuth();
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((responce) => {
  //       const { email, uid } = responce.user;
  //       if (auth.currentUser) {
  //         auth.currentUser
  //           .getIdToken(true)
  //           .then((idToken) => {
  //             dispatch(
  //               setUser({
  //                 user: {
  //                   email: email ?? '',
  //                   id: uid,
  //                   token: idToken,
  //                 },
  //               })
  //             );
  //             navigate(`/${pageName.editor.En}`);
  //             setMessage('');
  //           })
  //           .catch(() => setMessage(''));
  //       } else {
  //         setMessage(ErrorMessages.ERROR_AUTH_CURRENT_USER[language]);
  //       }
  //     })
  //     .catch(() => setMessage(ErrorMessages.ERROR_AUTH_INVALID_USER[language]));
  // };

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
