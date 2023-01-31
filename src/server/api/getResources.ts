import { GRPC as Cerbos } from "@cerbos/grpc";

const cerbos = new Cerbos("localhost:3593", { tls: false });

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const user = query?.user ? JSON.parse(query.user as string) : null;

  if (!user || !user.loggedIn) {
    return "User is not logged in";
  }

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

  const result = cerbos.checkResources(cerbosPayload);

  return {
    response: result,
  };
});
