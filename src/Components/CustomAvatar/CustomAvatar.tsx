import { Avatar, Tooltip } from '@mui/material';
import { green } from '@mui/material/colors';
import { FC } from 'react';
import { ICustomAvatarPros } from './CustomAvatar.types';

const CustomAvatar: FC<ICustomAvatarPros> = ({ userName }) => {
  if (userName) {
    return (
      <Tooltip title={userName} arrow>
        <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
          {userName.slice(0, 2).toLocaleUpperCase()}
        </Avatar>
      </Tooltip>
    );
  }
  return <Avatar alt="Anonim" src="" />;
};

export default CustomAvatar;
