import { store } from '../store';
import Storage from '../../utils/Storage/Storage';

describe('apiSlice test', () => {
  it('Should initially set BaseUrl to LS or empty string', () => {
    const state = store.getState().ApiData;
    expect(state.baseUrl).toEqual(Storage.recallEndpoint() || '');
  });

  it('Should initially set errorMessage to empty string', () => {
    const state = store.getState().ApiData;
    expect(state.errorMessage).toEqual('');
  });

  it('Should initially set isSchema to false', () => {
    const state = store.getState().ApiData;
    expect(state.isSchema).toEqual(false);
  });
});
