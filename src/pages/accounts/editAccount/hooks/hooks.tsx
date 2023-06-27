import axios from 'axios';
import store from '../../../../redux/store';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function handler(url: string, body: object): Promise<any> {
  return axios
    .patch(url, body, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${store.getState().token.value}`,
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      throw err;
    });
}
