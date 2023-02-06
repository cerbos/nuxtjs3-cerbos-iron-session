import { useSession } from '~/server/utils/session';

export default defineNuxtRouteMiddleware( async (to, from) => {
    
    const { user } = await useSession(event);

    const requestBody = {
        principal: { id: user.value.id, roles: roles.value },
        resource: {
            kind: "document",
            id: $route.params.id,
            attributes: documentAttrs,
        },
        action: "view",
    };

    const { data: isAllowed } = await useFetch("/api/isAllowed", {
        method: "POST",
        body: requestBody,
    });

    if (!isAllowed.value) {
        return navigateTo('/');
    }

    return navigateTo('/')
})

