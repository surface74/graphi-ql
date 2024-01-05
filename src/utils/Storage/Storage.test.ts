import Language from '../../enum/language';
import Storage from './Storage';
import { LStorageKey } from './Storage.types';

beforeEach(() => {
  localStorage.clear();
});

const TEST_VALUE = 'Here we are!';
const WRONG_LANGUAGE = 'ANY';

describe('Storage', () => {
  test('correctly get stored languages', () => {
    for (const key of Object.keys(Language)) {
      Storage.saveLanguage(key as Language);
      expect(Storage.recallLanguage()).toBe(Language[key as Language]);
    }
  });

  test('correctly get language while stored the wrong one', () => {
    localStorage.setItem(LStorageKey.LANGUAGE, WRONG_LANGUAGE);
    expect(Storage.recallLanguage()).toBe(Language.En);
  });

  test('correctly get stored endpoint', () => {
    Storage.saveEndpoint(TEST_VALUE);
    expect(Storage.recallEndpoint()).toBe(TEST_VALUE);
  });

  test('correctly get stored endpoint', () => {
    Storage.saveHeaders(TEST_VALUE);
    expect(Storage.recallHeaders()).toBe(TEST_VALUE);
  });

  test('correctly get stored request', () => {
    Storage.saveRequest(TEST_VALUE);
    expect(Storage.recallRequest()).toBe(TEST_VALUE);
  });

  test('correctly get stored request', () => {
    Storage.saveVariables(TEST_VALUE);
    expect(Storage.recallVariables()).toBe(TEST_VALUE);
  });
});
