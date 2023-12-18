export enum AuthActionType {
  LOGIN,
  SIGNUP,
}

export interface IAuthPageProps {
  authActionType: AuthActionType;
}
