import { store } from '../store';

describe('userSlice test', () => {
  it('Should initially set user to empty', () => {
    const state = store.getState().user;
    expect(state.user).toEqual({
      email: '',
      id: '',
    });
  });
});
