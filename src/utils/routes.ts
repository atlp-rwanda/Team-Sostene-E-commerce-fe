interface appRoutes {
  home: string;
  sellerListItems: string;
  authenticate: string;
  login: string;
  signup: string;
  about: string;
  changePass: string;
  addToCart: string;
  chats: string;
  profile: string;
}
const routes: appRoutes = {
  home: '/',
  sellerListItems: '/sellerItems',
  authenticate: '/accounts/authenticate',
  login: '/accounts/login',
  signup: '/accounts/signup',
  about: '/about_us',
  changePass: '/accounts/change/password',
  addToCart: '/addToCart',
  chats: '/chats',
  profile: '/accounts/profile',
};

export default routes;
