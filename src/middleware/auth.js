import { useSession } from "~/server/utils/session";
import { getDocumentAttributesById } from "~/db";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const documentId = to.params.id;
  const event = useRequestEvent();
  const { user } = await useSession(event);
  console.log("user", user);
  const documentAttrs = await getDocumentAttributesById(documentId);

  console.log("documentAttrs", documentAttrs);

  const requestBody = {
    principal: {
      id: user.id,
      roles: [user.role],
    },
    resource: {
      kind: "document",
      id: documentId,
      attributes: documentAttrs,
    },
    action: "view",
  };

  console.log("requestBody", requestBody);

  const { data: isAllowed } = await useFetch("/api/isAllowed", {
    method: "POST",
    body: requestBody,
  });

  if (!isAllowed.value) {
    return abortNavigation("Error 403: not authorized");
  }

  return navigateTo(to.path, { redirectCode: 301 });
});
