import { getDocumentAttributesById } from '~/db';
import { cerbos } from "../utils/cerbos";

export default defineEventHandler(async (event) => {

  const query = getQuery(event)
  const { user } = await useSession(event)
  const documentAttrs = await getDocumentAttributesById(query.documentId as string)


  const requestBody = {
    principal: {
      id: user.id,
      roles: [user.role]
    },
    resource: {
      kind: 'document',
      id: query.documentId as string,
      attributes: documentAttrs
    },
    action: 'view'
  }

  const isAllowed = await cerbos.isAllowed(requestBody)
    .catch( (error)=> {
      console.log( error );
      return false;
    })
  
  console.log( isAllowed);
  return isAllowed
})
