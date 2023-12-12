export interface IUserState {
  user: {
    email: string;
    token: string;
    id: string;
  };
}

export type UIState = {
  docsIsOpen: boolean;
};
