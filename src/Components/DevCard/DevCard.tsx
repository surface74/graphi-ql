import { Avatar, Box, Link, Typography, useMediaQuery } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useDataContext } from '../../DataContext/useDataContext';
import UIStrings from '../../assets/UIStrings.json';
import { avatarStyles, cardWrapper, nameWrapper } from './styles';
import theme from '../../ThemeProvider/ThemeProvider';

type DevCardProps = {
  props: {
    name: string;
    bio: string;
    location: string;
    imgSrc: string;
    contribution: string;
    gitHub: string;
  };
};

const DevCard = ({ props }: DevCardProps) => {
  const { language } = useDataContext();
  const MobileM = useMediaQuery('(min-width:600px)');
  const { name, bio, location, imgSrc, gitHub, contribution } = props;

  return (
    <Box sx={cardWrapper(MobileM)}>
      <Avatar alt="Dev Name" src={imgSrc} sx={avatarStyles(MobileM)} />
      <Box sx={{ pt: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <Box sx={nameWrapper}>
          <Typography variant="h5" sx={{ lineHeight: 1.6 }}>
            {name}
          </Typography>
          <Link href={gitHub} target="_blank">
            <GitHubIcon sx={{ color: theme.palette.text.primary }} />
          </Link>
        </Box>
        <Typography>{bio}</Typography>
        <Typography>
          {UIStrings.CardFields[language].location}: {location}
        </Typography>
        <Typography>
          {UIStrings.CardFields[language].contribution}: {contribution}
        </Typography>
      </Box>
    </Box>
  );
};

export default DevCard;
