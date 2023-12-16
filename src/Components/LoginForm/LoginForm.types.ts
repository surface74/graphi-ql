export enum LoginFormType {
  LOGIN,
  SIGNUP,
}

export interface ILoginFormProps {
  title: string;
  onSubmitForm: (email: string, pass: string) => void;
  message?: string;
  type: LoginFormType;
}
