import Language from '../../enum/language';
import { LStorageKey as StorageKey } from './Storage.types';

const setItem = (key: StorageKey, value: string) =>
  localStorage.setItem(key, value.trim());

const getItem = (key: StorageKey) => localStorage.getItem(key) || '';

const Storage = {
  saveLanguage: (language: Language) => {
    setItem(StorageKey.LANGUAGE, language);
  },

  recallLanguage: (): Language => {
    const DEFAULT_LANGUAGE = Language.En;

    const storedValue = getItem(StorageKey.LANGUAGE);
    if (!storedValue) {
      return DEFAULT_LANGUAGE;
    }

    for (const [key, value] of Object.entries(Language)) {
      if (storedValue === value) {
        return Language[key as Language];
      }
    }

    return DEFAULT_LANGUAGE;
  },

  saveEndpoint: (endpoint: string) => {
    setItem(StorageKey.ENDPOINT, endpoint);
  },

  recallEndpoint: (): string => {
    return getItem(StorageKey.ENDPOINT);
  },

  saveRequest: (text: string) => {
    setItem(StorageKey.REQUEST, text);
  },

  recallRequest: (): string => {
    return getItem(StorageKey.REQUEST);
  },

  saveVariables: (text: string) => {
    setItem(StorageKey.VARIABLES, text);
  },

  recallVariables: (): string => {
    return getItem(StorageKey.VARIABLES);
  },

  saveHeaders: (text: string) => {
    setItem(StorageKey.HEADERS, text);
  },

  recallHeaders: (): string => {
    return getItem(StorageKey.HEADERS);
  },
};

export default Storage;
