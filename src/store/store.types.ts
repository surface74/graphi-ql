export interface IUserState {
  user: {
    email: string;
    id: string;
  };
}

export type UIState = {
  docsIsOpen: boolean;
  isLoadingSchema: false;
};

export type ApiState = {
  baseUrl: string;
  errorMessage: string;
};
