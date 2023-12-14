import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAdd from '@mui/icons-material/PersonAdd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import UIStrings from '../../assets/UIStrings.json';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { ChangeOnScrollProps, HeaderProps } from './Header.types.ts';
import Language from '../../enum/language.ts';
import { useDataContext } from '../../DataContext/useDataContext.ts';
import {
  flexRowCenter,
  loginIcon,
  logoIcon,
  logoIconMobile,
  logoTitle,
  logoTitleMobile,
  mobileMenuWrapper,
  navWrapper,
  rightMenuWrapper,
  switchLangWrapper,
} from './styles.ts';
import { useAuth } from '../../hooks/auth';
import { pageName } from '../../common-types/common-types';
import { logOut } from '../Authority/firebase.ts';

const ScrollHandler = (props: ChangeOnScrollProps) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(props.children, {
    style: {
      height: trigger ? 90 : 100,
      backgroundColor: trigger ? '#a0a0a081' : '#1a1a1a',
      transition: trigger ? '0.5s' : '0.5s',
      boxShadow: 'none',
    },
  });
};

const ChangeOnScroll = (props: ChangeOnScrollProps) => {
  return <ScrollHandler {...props}>{props.children}</ScrollHandler>;
};

const Header: React.FC<HeaderProps> = () => {
  const location = useLocation();
  const { language, setLanguage } = useDataContext();
  const { isLogin } = useAuth();
  const navigate = useNavigate();

  const pages = Object.values(pageName);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleClickLogout = () => {
    logOut();
  };

  const handleClickLogin = () => navigate(`/${pageName.login.En}`);

  const handleClickSignUp = () => navigate(`/${pageName.signup.En}`);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const currentPath = location.pathname;

  const changeLang = () => {
    setLanguage(language === Language.En ? Language.Ru : Language.En);
  };

  return (
    <ChangeOnScroll>
      <AppBar position="sticky" sx={flexRowCenter} enableColorOnDark>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={logoIcon} />

            <Typography variant="h6" noWrap sx={logoTitle}>
              GraphiQL
            </Typography>

            <Box sx={mobileMenuWrapper}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page, i) => (
                  <MenuItem key={i} onClick={handleCloseNavMenu}>
                    <Link to={`/${page.En}`}>
                      <div id={`${page.En}`}>
                        <Typography
                          textAlign="center"
                          sx={
                            currentPath.toLowerCase() ===
                            `/${page.En.toLowerCase()}`
                              ? { color: '#535bf2' }
                              : {
                                  color: 'black',
                                  fontFamily: 'menlo',
                                }
                          }
                        >
                          {page[language]}
                        </Typography>
                      </div>
                    </Link>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <AdbIcon sx={logoIconMobile} />
            <Typography variant="h5" noWrap sx={logoTitleMobile}>
              GraphiQL
            </Typography>

            <Box sx={navWrapper}>
              {pages.map((page, i) => (
                <Button
                  key={`button-${page.En}`}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    color: 'black',
                    display: 'block',
                  }}
                >
                  <Link key={i + 1} to={`/${page.En}`}>
                    <div id={`${page.En}`}>
                      <Typography
                        textAlign="center"
                        sx={
                          currentPath.toLowerCase() ===
                          `/${page.En.toLowerCase()}`
                            ? { borderBottom: '2px solid #535bf2' }
                            : { color: 'white' }
                        }
                      >
                        {page[language]}
                      </Typography>
                    </div>
                  </Link>
                </Button>
              ))}
            </Box>

            <Box sx={rightMenuWrapper}>
              <Box sx={switchLangWrapper}>
                <Typography
                  textAlign="center"
                  sx={{
                    color: 'white',
                    fontFamily: 'menlo',
                  }}
                >
                  {UIStrings.RuLanguage[language]}
                </Typography>

                <Switch
                  defaultChecked
                  size="medium"
                  color="default"
                  onChange={changeLang}
                />

                <Typography textAlign="center">
                  {UIStrings.EnLanguage[language]}
                </Typography>
              </Box>

              {isLogin ? (
                <IconButton onClick={handleClickLogout}>
                  <LogoutIcon sx={loginIcon} />
                </IconButton>
              ) : (
                <>
                  <IconButton onClick={handleClickLogin}>
                    <LoginIcon sx={loginIcon} />
                  </IconButton>
                  <IconButton onClick={handleClickSignUp}>
                    <PersonAdd sx={loginIcon} />
                  </IconButton>
                </>
              )}

              <Avatar alt="Remy Sharp" src="" />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ChangeOnScroll>
  );
};

export default Header;
