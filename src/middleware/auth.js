import { useSession } from '~/server/utils/session';
import { getDocumentAttributesById } from "~/db";

export default defineNuxtRouteMiddleware( async (to, from) => {
    
    const documentId = to.params.id;
    const event = useRequestEvent();
    const { user } = await useSession( event );
    const documentAttrs = await getDocumentAttributesById(documentId);

    const requestBody = {
        principal: { 
            id: user.id,
            roles: user.roles || 'user'
        },
        resource: {
            kind: "document",
            id: documentId,
            attributes: documentAttrs,
        },
        action: "view",
    };

    const { data: isAllowed } = await useFetch("/api/isAllowed", {
        method: "POST",
        body: requestBody,
    });

    if ( !isAllowed.value ) {
        return abortNavigation( 'Navigation not allowed');
    }

    return navigateTo(to);
})

