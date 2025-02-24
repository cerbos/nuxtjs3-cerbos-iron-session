import { useSession } from '~/server/utils/session'

export default defineEventHandler(async (event) => {
  if (event.context.session) {
    return
  }

  await useSession(event)
})
