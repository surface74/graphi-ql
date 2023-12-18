import Language from '../enum/language';

export interface IDataContext {
  language: Language;
  setLanguage: (language: Language) => void;
}
