import UIStrings from '../assets/UIStrings.json';

export interface Form {
  name?: string;
  email?: string;
  password?: string;
  passwordRepeat?: string;
}

export const pageName = {
  welcome: {
    Ru: UIStrings.Welcome.Ru,
    En: UIStrings.Welcome.En,
  },
  login: {
    Ru: UIStrings.Login.Ru,
    En: UIStrings.Login.En,
  },
  signup: {
    Ru: UIStrings.SignUp.Ru,
    En: UIStrings.SignUp.En,
  },
  editor: {
    Ru: UIStrings.Editor.Ru,
    En: UIStrings.Editor.En,
  },
};
