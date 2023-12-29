import { Button, SxProps, Theme } from '@mui/material';

type CustomButtonPros = {
  variant?: 'text' | 'outlined' | 'contained';
  title: string;
  startIcon?: JSX.Element;
  onClick?: () => void | Promise<void>;
  sx?: SxProps<Theme> | undefined;
  color?: 'primary' | 'secondary';
};

const CustomButton = ({
  startIcon,
  title,
  onClick,
  sx,
  color,
  variant,
  ...props
}: CustomButtonPros) => {
  return (
    <Button
      variant={variant ?? 'contained'}
      startIcon={startIcon}
      onClick={onClick}
      sx={sx}
      color={color}
      {...props}
    >
      {title}
    </Button>
  );
};

export default CustomButton;
