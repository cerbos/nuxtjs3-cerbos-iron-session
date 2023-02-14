import { useSession } from '~/server/utils/session'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  if (!query.role) {
    return false
  }

  const session = await useSession(event)
  session.user = {
    ...session.user,
    role: query.role
  }
  await session.save()
  return 'OK'
})
