import { useSession } from '~/server/utils/session'

export default defineEventHandler(async (event) => {
  const session = await useSession(event)
  return JSON.stringify(session)
})
