import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Switch from '@mui/material/Switch';
import useScrollTrigger from '@mui/material/useScrollTrigger';

import UIStrings from '../../assets/UIStrings.json';
import { ChangeOnScrollProps, HeaderProps } from './Header.types.ts';
import Language from '../../enum/language.ts';
import { useDataContext } from '../../DataContext/useDataContext.ts';
import {
  flexRowCenter,
  iconBtnStyle,
  langStyle,
  loginIcon,
  logoIcon,
  logoIconMobile,
  logoTitle,
  logoTitleMobile,
  menu,
  mobileMenuWrapper,
  navWrapper,
  pageButton,
  rightMenuWrapper,
  switchLangWrapper,
} from './styles.ts';
import { useAuth } from '../../hooks/auth';
import { pageName } from '../../common-types/common-types';
import { logOut } from '../Authority/firebase.ts';
import { useDispatch } from 'react-redux';
import { setBaseUrl } from '../../store/slices/apiSlice.ts';
import CustomAvatar from '../CustomAvatar/CustomAvatar.tsx';
import { useAppSelector } from '../../hooks/store.ts';

const ScrollHandler = (props: ChangeOnScrollProps) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(props.children, {
    style: {
      height: trigger ? 60 : 100,
      backgroundColor: '#1a1a1a',
      transition: trigger ? '0.5s' : '0.5s',
      boxShadow: 'none',
    },
  });
};

const ChangeOnScroll = (props: ChangeOnScrollProps) => {
  return <ScrollHandler {...props}>{props.children}</ScrollHandler>;
};

const Header: React.FC<HeaderProps> = () => {
  const { email } = useAppSelector((state) => state.user.user);
  const location = useLocation();
  const { language, setLanguage } = useDataContext();
  const { isLogin } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [langChecked, setLangChecked] = React.useState(
    language === Language.En
  );

  const pages = Object.values(pageName)
    .filter(
      (name) => name.En === pageName.welcome.En || name.En === pageName.main.En
    )
    .filter((name) => (isLogin ? name : name.En !== pageName.main.En));

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleClickAuth = () => {
    isLogin ? logOut() : navigate(`/${pageName.login.En}`);
    isLogin ? dispatch(setBaseUrl('')) : null;
  };

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
    setLangChecked(!langChecked);
  };

  const AuthIcon = isLogin ? LogoutIcon : LoginIcon;

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
                sx={menu}
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
                <MenuItem>
                  <Switch
                    checked={langChecked}
                    size="medium"
                    color="secondary"
                    onChange={changeLang}
                  />
                </MenuItem>
              </Menu>
            </Box>

            <AdbIcon sx={logoIconMobile} />
            <Typography variant="h6" noWrap sx={logoTitleMobile}>
              GraphiQL
            </Typography>

            <Box sx={navWrapper}>
              {pages.map((page, i) => (
                <Button
                  key={`button-${page.En}`}
                  onClick={handleCloseNavMenu}
                  sx={pageButton}
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
                <Typography sx={langStyle}>
                  {UIStrings.RuLanguage[language]}
                </Typography>
                <Switch
                  checked={langChecked}
                  size="medium"
                  color="secondary"
                  onChange={changeLang}
                />

                <Typography sx={langStyle}>
                  {UIStrings.EnLanguage[language]}
                </Typography>
              </Box>

              <IconButton sx={iconBtnStyle} onClick={handleClickAuth}>
                <AuthIcon sx={loginIcon} />
              </IconButton>

              {!isLogin && (
                <IconButton sx={iconBtnStyle} onClick={handleClickSignUp}>
                  <PersonAdd sx={loginIcon} />
                </IconButton>
              )}
              <CustomAvatar userName={isLogin ? email : ''} />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ChangeOnScroll>
  );
};

export default Header;
