import Language from '../enum/language';

const key = 'language';
const defaultValue = Language.En;

export const saveLanguage = (language: Language) => {
  localStorage.setItem(key, language);
};

export const recallLanguage = (): Language => {
  const storedValue = localStorage.getItem(key);
  if (!storedValue) {
    return defaultValue;
  }

  for (const [key, value] of Object.entries(Language)) {
    if (storedValue === value) {
      return Language[key as Language];
    }
  }

  return defaultValue;
};
