import { Box, Icon, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DevCard from '../../Components/DevCard/DevCard';
import styles from './style.module.scss';
import CustomButton from '../../Components/CustomButton/CustomButton';
import CardsContent from '../../assets/CardsContent.json';
import { useDataContext } from '../../DataContext/useDataContext';
import UIContent from '../../assets/UIStrings.json';
import {
  welcomeHeading,
  welcomeSubTitle,
  welcomeTitle,
  wrapperAuth,
  wrapperButtons,
  wrapperMainSection,
} from './styles';
import { pageName } from '../../common-types/common-types';
import { useAuth } from '../../hooks/auth';

const WelcomePage: React.FC = () => {
  const navigator = useNavigate();
  const { language } = useDataContext();
  const { isLogin } = useAuth();

  const devCardsContent = [
    {
      Ru: CardsContent.Sergey.Ru,
      En: CardsContent.Sergey.En,
    },
    {
      Ru: CardsContent.Elena.Ru,
      En: CardsContent.Elena.En,
    },
    {
      Ru: CardsContent.Valeriia.Ru,
      En: CardsContent.Valeriia.En,
    },
  ];

  function handleSignIn() {
    navigator(`/${pageName.login.En}`);
  }

  function handleSignUp() {
    navigator(`/${pageName.signup.En}`);
  }

  function handleGetStarted() {
    navigator(`/${pageName.main.En}`);
  }
  return (
    <>
      <Typography variant="h4" sx={welcomeHeading}>
        {UIContent.WelcomeHeading[language]}
      </Typography>

      <Box sx={wrapperAuth}>
        <Typography variant="h5" sx={welcomeTitle}>
          {!isLogin
            ? UIContent.WelcomeTextNotAuth[language]
            : UIContent.WelcomeTextAuth[language]}
        </Typography>
        <Box sx={wrapperButtons}>
          <CustomButton
            data-testid="sign-in"
            variant="contained"
            title={
              !isLogin
                ? UIContent.SignIn[language]
                : UIContent.GetStarted[language]
            }
            onClick={!isLogin ? handleSignIn : handleGetStarted}
          />
          {!isLogin && (
            <CustomButton
              data-testid="sign-up"
              variant="outlined"
              title={UIContent.SignUp[language]}
              color="secondary"
              onClick={handleSignUp}
            />
          )}
        </Box>
      </Box>
      <Box sx={wrapperMainSection}>
        <Typography variant="subtitle1" sx={welcomeSubTitle}>
          {UIContent.WelcomeAbout[language]}
        </Typography>
        <Typography variant="subtitle1" sx={welcomeSubTitle}>
          {UIContent.WelcomeScholl[language]}
        </Typography>

        {devCardsContent.map((dev, i) => (
          <DevCard key={i} props={dev[language]} />
        ))}

        <Link href="https://rs.school/react/">
          <Icon sx={{ width: 100, height: 80 }}>
            <img
              alt="Rolling Scopes School Logo"
              className={styles['logo-img']}
              src="https://rollingscopes.com/images/logo_rs_text.svg"
            />
          </Icon>
        </Link>
      </Box>
    </>
  );
};

export default WelcomePage;
