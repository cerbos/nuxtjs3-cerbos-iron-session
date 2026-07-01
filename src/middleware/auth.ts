export default defineNuxtRouteMiddleware(async () => {
  const { data } = await useFetch('/api/auth/session', {
    headers: useRequestHeaders()
  })

  const session = data.value ? JSON.parse(data.value) : null

  if (!session || !session.user) {
    return navigateTo('/login')
  }
})
