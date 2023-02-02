import { getIronSession } from 'iron-session';

export async function useSession(event) {
  if (event.context.session) {
    return event.context.session;
  }
  const session = await getIronSession(event.req, event.res, {
    cookieName: 'nuxt_session',
    password: 'complex_password_at_least_32_characters_long',
  });
  event.context.session = session;
  return session;
}
