import { watchdog } from '../../utils/watchdog';
import { logOut } from './firebase';

const AUTH_COOKIE = encodeURIComponent('accessToken');
const AUTH_LIFETIME = 3600; // in seconds
const WATCHDOG_INTERVAL = 10; // in seconds
const COOKIES_DELIMITER = '; ';

export const setAccessTokenCookie = (token: string) => {
  const lifetime = import.meta.env.VITE_AUTH_COOKIE_LIFETIME || AUTH_LIFETIME;

  const cookieData: string[] = [`${AUTH_COOKIE}=${token}`];
  cookieData.push(`path='/'`);
  cookieData.push(`max-age=${lifetime}`);

  document.cookie = cookieData.join(COOKIES_DELIMITER);
};

export const isAccessTokenCookieValid = () => {
  const cookies = document.cookie.split(COOKIES_DELIMITER);

  return cookies.some((cookie) => cookie.startsWith(`${AUTH_COOKIE}=`));
};

export const resetAccessTokenCookie = () => {
  const cookieData: string[] = [`${AUTH_COOKIE}=''`];
  cookieData.push(`max-age=0`);

  document.cookie = cookieData.join(';');
};

export const startWatchdog = () => {
  watchdog(isAccessTokenCookieValid, logOut, WATCHDOG_INTERVAL);
};
