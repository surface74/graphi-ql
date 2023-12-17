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
import { Grid, Link } from '@mui/material';
import { pageName } from '../../common-types/common-types';
import { getSchema } from '../../yup/schema';
import { ILoginFormProps, LoginFormType } from './LoginForm.types';
import CustomTextField from '../CustomTextField/CustomTextField';

const LoginForm: FC<ILoginFormProps> = ({
  title,
  onSubmitForm,
  type,
  message,
}) => {
  if (message) console.log('AuthForm message: ', message);

  const { language } = useDataContext();

  const schema = getSchema(language);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: ({ email, password }) => {
      onSubmitForm(email, password);
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          padding: 10,
          borderRadius: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // backgroundColor: 'Background',
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
          <CustomTextField
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
          <CustomTextField
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
      <Grid container>
        <Grid item>
          {type === LoginFormType.LOGIN ? (
            <Link href={pageName.signup.En} variant="body2">
              {UIStrings.SignUpPageTitle[language]}
            </Link>
          ) : (
            <Link href={pageName.login.En} variant="body2">
              {UIStrings.SignInPageTitle[language]}
            </Link>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginForm;
