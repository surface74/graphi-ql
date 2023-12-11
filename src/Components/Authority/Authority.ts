export default class Authority {
  private userState = false;

  public setIsLogin = (isLogin: boolean) => {
    this.userState = isLogin;
  };

  public isLogin = (userLogged?: boolean) => {
    return userLogged === undefined ? this.userState : !!userLogged;
  };
}
