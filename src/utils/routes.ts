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
  editProduct: (id: string) => string;
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
  editProduct: (id: string) => `/sellerItems/editProduct/${id}`,
};
export default routes;
