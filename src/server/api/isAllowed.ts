import { GRPC as Cerbos } from "@cerbos/grpc";

const cerbos = new Cerbos("localhost:3593", { tls: false });

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event);
    console.log("data", data);
    const isAllowed = await cerbos.isAllowed(data);

    return isAllowed;
  } catch (error) {
    return false;
  }
});
