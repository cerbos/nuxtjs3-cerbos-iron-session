import { GRPC } from "@cerbos/grpc";
import { useSession } from '~/server/utils/session';

// const cerbos = new Cerbos("localhost:3593", { tls: false });
export const cerbos = new GRPC(
  "demo-express-clerk-cerbos-pdp-qh5dbmiiva-uk.a.run.app",
  { tls: true }
);

export default defineEventHandler(async (event) => {
  
  const { user } = await useSession(event);

  const roles = user.role ? [user.role as string] : ["user"];
  const email = user.email;

  const cerbosPayload = {
    principal: {
      id: user.id,
      roles,
      attributes: { email },
    },
    resources: [
      {
        resource: {
          kind: "contact",
          id: "1",
          attributes: {
            owner: user.id, // faked to demostrate ownership policy
            lastUpdated: new Date(2020, 10, 10).toISOString(),
          },
        },
        actions: ["read", "create", "update", "delete"],
      },

      {
        resource: {
          kind: "contact",
          id: "2",
          attributes: {
            owner: "test2",
            lastUpdated: new Date(2020, 10, 10).toISOString(),
          },
        },
        actions: ["read", "create", "update", "delete"],
      },
    ],
  };

  const result = await cerbos.checkResources(cerbosPayload);

  return {
    response: result,
  };
});
