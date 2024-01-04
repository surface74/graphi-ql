import { store } from '../store';

describe('UISlice test', () => {
  it('Should initially set docsIsOpen to false', () => {
    const state = store.getState().UIData;
    expect(state.docsIsOpen).toEqual(false);
  });

  it('Should initially set isLoadingSchema to false', () => {
    const state = store.getState().UIData;
    expect(state.isLoadingSchema).toEqual(false);
  });
});
