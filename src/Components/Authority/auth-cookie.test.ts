import * as AuthCookie from './auth-cookie';

const FAKE_TOKEN = '123456';

describe('auth-cookie', () => {
  test('token stored/reset correctly', () => {
    AuthCookie.setAccessTokenCookie(FAKE_TOKEN);
    expect(AuthCookie.isAccessTokenCookieValid()).toBeTruthy();
    AuthCookie.resetAccessTokenCookie();
    expect(AuthCookie.isAccessTokenCookieValid()).toBeFalsy();
  });
});
