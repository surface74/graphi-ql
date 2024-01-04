import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { useAuth } from './auth';
import { useAppDispatch } from './store';
import { storeUserState } from '../store/slices/userSlice';
import { FC } from 'react';

interface ILoginProps {
  user?: {
    email: string;
    id: string;
  };
}

const fakeUser = {
  email: 'fake@email.com',
  id: '123456',
};

const TestComponent: FC<ILoginProps> = ({ user }) => {
  const dispatch = useAppDispatch();
  if (user) {
    dispatch(
      storeUserState({
        user,
      })
    );
  }
  const { isLogin } = useAuth();
  return <h1>{String(isLogin)}</h1>;
};

const WrapperComponent: FC<ILoginProps> = ({ user }) => {
  return (
    <Provider store={store}>
      <TestComponent user={user} />
    </Provider>
  );
};

describe('Hook useAuth()', () => {
  test('return correct state for not logged user', () => {
    render(<WrapperComponent />);

    const state = screen.getByRole('heading', {
      name: 'false',
    });
    expect(state).toBeInTheDocument();
  });
  test('return correct state for logged user', () => {
    render(<WrapperComponent user={fakeUser} />);

    const state = screen.getByRole('heading', {
      name: 'true',
    });
    expect(state).toBeInTheDocument();
  });
});
