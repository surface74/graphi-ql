export interface IFormProps {
  title: string;
  handleClick: (email: string, pass: string) => void;
  message?: string;
}
