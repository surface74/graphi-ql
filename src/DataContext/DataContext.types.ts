import Authority from '../Components/Authority/Authority';
import Language from '../enum/language';

export interface IPageName {
  [key: string]: {
    Ru: string;
    En: string;
  };
}

export interface IDataContext {
  language: Language;
  pageName: IPageName;
  authority: Authority;
  setLanguage: (language: Language) => void;
}
