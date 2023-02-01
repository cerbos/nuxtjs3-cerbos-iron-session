import { GRPC as Cerbos } from "@cerbos/grpc";

const cerbos = new Cerbos("localhost:3593", { tls: false });

export default defineEventHandler(async (event) => {
  const data = await readBody(event);

  const isAllowed = await cerbos.isAllowed(data);

  return isAllowed;
});
