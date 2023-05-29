import { rest } from 'msw';

export const handlers = [
  rest.post(`${import.meta.env.VITE_BACKEND_URL}auth/google/success`, async (_req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        Code: 200,
        Message: `Logged In Successfully as you`,
        token: '395839531143',
      })
    );
  }),
];
