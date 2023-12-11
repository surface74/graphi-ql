import { Button, ButtonProps } from '@mui/material';

// type CustomButtonPros = {
//   variant: 'text' | 'outlined' | 'contained';
//   title: string;
//   startIcon?: JSX.Element;
//   onClick?: () => void;
//   sx?: SxProps<Theme> | undefined;
//   color?: 'primary' | 'secondary';
// };

function CustomButton({
  startIcon,
  title,
  onClick,
  sx,
  color,
  ...props
}: ButtonProps) {
  return (
    <Button
      variant="contained"
      startIcon={startIcon}
      onClick={onClick}
      sx={sx}
      color={color}
      {...props}
    >
      {title}
    </Button>
  );
}

export default CustomButton;
