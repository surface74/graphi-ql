import { store } from '../store';
import Storage from '../../utils/Storage/Storage';

describe('querySlice test', () => {
  it('Should initially set value to LS or empty string', () => {
    const state = store.getState().querySlice;
    expect(state.value).toEqual(Storage.recallEndpoint() || '');
  });

  it('Should initially set headers to LS or empty string', () => {
    const state = store.getState().querySlice;
    expect(state.headers).toEqual(Storage.recallEndpoint() || '');
  });

  it('Should initially set variables to LS or empty string', () => {
    const state = store.getState().querySlice;
    expect(state.variables).toEqual(Storage.recallEndpoint() || '');
  });
});
