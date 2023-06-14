interface appRoutes {
  home: string;
  sellerListItems: string;
  authenticate: string;
  login: string;
  signup: string;
  about: string;
  changePass: string;
}
const routes: appRoutes = {
  home: '/',
  sellerListItems: '/sellerItems',
  authenticate: '/accounts/authenticate',
  login: '/accounts/login',
  signup: '/accounts/signup',
  about: '/about_us',
  changePass: '/accounts/change/password',
};

export default routes;
