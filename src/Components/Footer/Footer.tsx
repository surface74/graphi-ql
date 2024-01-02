import { AppBar, Box, Icon, Link, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import styles from './styles.module.scss';
import {
  githubIcon,
  wrapperAppBar,
  wrapperFooterBox,
  yearTitle,
} from './styles';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer: React.FC = () => {
  const actualYear = new Date().getFullYear();

  return (
    <>
      <AppBar position="static" sx={wrapperAppBar}>
        <Container maxWidth="xl" fixed>
          <Box sx={wrapperFooterBox}>
            <Link href="https://rs.school/react/">
              <Icon sx={{ width: 80, height: 80 }}>
                <img
                  alt="Rolling Scopes School Logo"
                  className={styles['logo-img']}
                  src="https://rollingscopes.com/images/logo_rs_text.svg"
                />
              </Icon>
            </Link>
            <Typography sx={yearTitle}>Up&GoTeam {actualYear}&copy;</Typography>
            <Link href="https://github.com/MakaevaElena/graphiql-app">
              <GitHubIcon sx={githubIcon} />
            </Link>
          </Box>
        </Container>
      </AppBar>
    </>
  );
};

export default Footer;
