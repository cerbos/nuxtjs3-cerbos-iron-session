import { GRPC } from "@cerbos/grpc";
import { getDocumentAttributesById } from '~/db';

export const cerbos = new GRPC(
  "localhost:3592",
  { tls: false }
);

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

  console.log(requestBody)


  const isAllowed = await cerbos.isAllowed(requestBody)
    .catch( (error)=> {
      console.log( error );
      return false;
    })
  
  console.log( isAllowed);
  return isAllowed
})
