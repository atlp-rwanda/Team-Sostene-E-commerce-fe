interface appRoutes {
  home: string;
  sellerListItems: string;
  authenticate: string;
  login: string;
  signup: string;
  about: string;
  collection: (cid: string) => string;
  addProduct: (cid: string, cname: string) => string;
  changePass: string;
  addToCart: string;
  chats: string;
  profile: string;
  reviews: string;
}
const routes: appRoutes = {
  home: '/',
  sellerListItems: '/sellerItems',
  authenticate: '/accounts/authenticate',
  login: '/accounts/login',
  signup: '/accounts/signup',
  about: '/about_us',
  collection: (cid) => `/sellerItems?cid=${cid}`,
  addProduct: (cid, cname) => `/dashboard/addProduct/${cid}/${cname}`,
  changePass: '/accounts/change/password',
  addToCart: '/addToCart',
  chats: '/chats',
  profile: '/accounts/profile',
  reviews: '/Reviews',
};

export default routes;
