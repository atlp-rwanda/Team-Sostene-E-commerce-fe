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
};

export default routes;
