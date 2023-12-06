import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../yup/schema';
import { setData } from '../../store/slices/formSlice';
import { Form } from '../../common-types/common-types';
import errorMessages from '../../assets/errorMessages.json';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<Form>({
    mode: 'onChange',
    resolver: yupResolver<Form>(schema),
  });

  const onSubmit: SubmitHandler<Form> = async (data) => {
    const { name, email, password, passwordRepeat } = data;

    if (data)
      dispatch(
        setData({
          name,
          email,
          password,
          passwordRepeat,
        })
      );

    navigate(`/Welcome`);
  };

  return (
    <>
      <h2 className={styles['tytle']}>Login Page</h2>
      <div className={styles['form__container']}>
        <div className={styles['form']}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles['form-row']}>
              <div>
                <label htmlFor="name">name</label>
              </div>
              <div>
                <input type="text" {...register('name')} id="name" />
              </div>
            </div>
            {errors.name && (
              <p className={styles['error-message']} role="alert">
                {errorMessages.CHECK_NAME_FIRST_LETTER.en}
              </p>
            )}

            <div className={styles['form-row']}>
              <label htmlFor="email">email</label>
              <input type="text" {...register('email')} id="email" />
            </div>
            {errors.email && (
              <p className={styles['error-message']} role="alert">
                {errors.email?.message}
              </p>
            )}

            <div className={styles['form-row']}>
              <label htmlFor="password">password</label>
              <input type="password" {...register('password')} id="password" />
            </div>
            {errors.password && (
              <p className={styles['error-message']} role="alert">
                {errors.password?.message}
              </p>
            )}

            <div className={styles['form-row']}>
              <label htmlFor="passwordRepeat">repeat password</label>
              <input
                type="password"
                {...register('passwordRepeat')}
                id="passwordRepeat"
              />
            </div>
            {errors.passwordRepeat && (
              <p className={styles['error-message']} role="alert">
                {errorMessages.CHECK_PASSWORD_MATCH.en}
              </p>
            )}

            <div className={styles['form-row']}>
              <button type="submit" disabled={!isDirty || !isValid}>
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
