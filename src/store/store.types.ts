export interface IUserState {
  user: {
    email: string;
    id: string;
  };
}

export type UIState = {
  docsIsOpen: boolean;
  isLoadingSchema: boolean;
};

export type ApiState = {
  baseUrl: string;
  errorMessage: string;
  isSchema: boolean;
  isProxy: boolean;
};
