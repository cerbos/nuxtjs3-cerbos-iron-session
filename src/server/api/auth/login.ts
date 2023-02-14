import { useSession } from '~/server/utils/session'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  if (!query.email) {
    return false
  }

  const session = await useSession(event)
  session.user = {
    email: query.email,
    id: 'not-the-current-user',
    role: query.role || 'user'
  }

  await session.save()
  return 'OK'
})
