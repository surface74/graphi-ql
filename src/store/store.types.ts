export type AuthDataState = {
  data: {
    name: string;
    email: string;
    password: string;
    passwordRepeat: string;
  };
};

export type UIState = {
  docsIsOpen: boolean;
};
