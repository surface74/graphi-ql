import { FC, useState } from 'react';
import Typography from '@mui/material/Typography';

import { IFormProps } from './AuthForm.types';

const AuthForm: FC<IFormProps> = ({ title, handleClick, message }) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <>
      <h3>{title}</h3>
      <Typography sx={{ color: 'red', padding: 0 }}>{message}&nbsp;</Typography>
      <div>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="password"
        />
        <button onClick={() => handleClick(email, pass)}>{title}</button>
      </div>
    </>
  );
};

export default AuthForm;
