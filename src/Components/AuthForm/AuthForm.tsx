import { FC } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import UIStrings from '../../assets/UIStrings.json';
import { useFormik } from 'formik';

import { useDataContext } from '../../DataContext/useDataContext';
import { IconButton, TextField } from '@mui/material';
import { pageName } from '../../common-types/common-types';
import { getSchema } from '../../yup/schema';
import { IAuthFormProps } from './AuthForm.types';
import { useNavigate } from 'react-router-dom';
import { AuthActionType } from '../../pages/AuthPage/AuthPage.types';

const AuthForm: FC<IAuthFormProps> = ({ title, onSubmitForm, type }) => {
  const { language } = useDataContext();
  const navigate = useNavigate();

  const schema = getSchema(language);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await onSubmitForm(email.trim(), password);
    },
  });

  const handleClick = () => {
    navigate(
      `/${
        type === AuthActionType.LOGIN ? pageName.signup.En : pageName.login.En
      }`
    );
  };

  const linkText =
    type === AuthActionType.LOGIN
      ? UIStrings.SignUpPageTitle[language]
      : UIStrings.SignInPageTitle[language];

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          borderRadius: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="white">
          {title}
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            fullWidth
            id="email"
            name="email"
            label={UIStrings.Email[language]}
            margin="normal"
            autoComplete="email"
            autoFocus
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label={UIStrings.Password[language]}
            type="password"
            margin="normal"
            autoComplete="current-password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {UIStrings.ButtonOk[language]}
          </Button>
        </Box>
      </Box>

      <IconButton onClick={handleClick} size="small" color="primary">
        {linkText}
      </IconButton>
    </Container>
  );
};

export default AuthForm;
