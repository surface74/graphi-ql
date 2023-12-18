import { AuthActionType } from '../../pages/AuthPage/AuthPage.types';

export interface IAuthFormProps {
  title: string;
  onSubmitForm: (email: string, pass: string) => void;
  type: AuthActionType;
}
