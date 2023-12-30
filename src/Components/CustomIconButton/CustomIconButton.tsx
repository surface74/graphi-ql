import { IconButton, SxProps, Theme } from '@mui/material';

type CustomIconButtonPros = {
  icon?: JSX.Element;
  onClick?: () => void | Promise<void>;
  sx?: SxProps<Theme> | undefined;
};

const CustomIconButton = ({
  icon,
  onClick,
  sx,
  ...props
}: CustomIconButtonPros) => {
  return (
    <IconButton onClick={onClick} sx={sx} {...props}>
      {icon}
    </IconButton>
  );
};

export default CustomIconButton;
