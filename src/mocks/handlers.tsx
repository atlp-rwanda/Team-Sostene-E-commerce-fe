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

  rest.patch(`${import.meta.env.VITE_BACKEND_URL}users/change-password`, async (req, res, ctx) => {
    const data = await req.json();
    if (data.oldPassword == 'Qwert@12345' && data.newPassword == 'Pass@12345') {
      return res(
        ctx.status(200),
        ctx.json({
          code: 200,
          message: 'Password updated successfully',
        })
      );
    } else {
      return res(
        ctx.status(401),
        ctx.json({
          code: 401,
          message: 'Incorrect password',
        })
      );
    }
  }),

  rest.get(`${import.meta.env.VITE_BACKEND_URL}reviews/rating/:id`, async (req, res, ctx) => {
    const { id } = req.params;
    if (id === '1') {
      return res(
        ctx.status(200),
        ctx.json({
          Code: 200,
          rating: 1,
        })
      );
    } else if (id === '2') {
      return res(
        ctx.status(400),
        ctx.json({
          Code: 400,
          rating: null,
        })
      );
    } else if (id === '3') {
      return res(
        ctx.status(200),
        ctx.json({
          Code: 200,
          rating: null,
        })
      );
    }
  }),
];
