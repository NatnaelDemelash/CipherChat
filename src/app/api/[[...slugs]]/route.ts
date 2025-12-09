import { Elysia, t } from 'elysia';

const rooms = new Elysia({ prefix: '/room' }).post('/create', () => {
  console.log('CREATE A NEW ROOM');
  return { success: true, message: 'Room created' };
});

const app = new Elysia({ prefix: '/api' })
  .get('/user', {
    user: { name: 'John', age: 20 },
  })
  .use(rooms);

export const GET = app.fetch;
export const POST = app.fetch;

export type App = typeof app;
