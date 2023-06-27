import { clearToken } from '../redux/slices/tokenSlice';
import store from '../redux/store';

export function logout() {
  store.dispatch(clearToken());
  localStorage.removeItem('authenticationMethod');
  window.location.href = '/';
}

export function isLoggedIn() {
  const token = store.getState().token;
  if (token.value) {
    return true;
  }
  return false;
}
