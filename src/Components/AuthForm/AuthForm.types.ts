import { AuthActionType } from '../../pages/AuthPage/AuthPage.types';

export interface IAuthFormProps {
  title: string;
  onSubmitForm: (email: string, pass: string) => Promise<void>;
  type: AuthActionType;
}
