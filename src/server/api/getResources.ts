import { GRPC as Cerbos } from "@cerbos/grpc";
const cerbos = new Cerbos("localhost:3593", { tls: false });

export default defineEventHandler(async () => {
  const { user } = useUser();

  if (!user.value.isLoggedIn) {
    return "User is not logged in";
  }

  const roles = user.value.role ? [user.value.role as string] : ["user"];
  const email = user.value.email;

  const cerbosPayload = {
    principal: {
      id: user.value.id,
      roles,
      attributes: { email },
    },
    resources: [
      {
        resource: {
          kind: "contact",
          id: "1",
          attributes: {
            owner: user.value.id, // faked to demostrate ownership policy
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

  console.log("cerbosPayload", cerbosPayload);

  const result = cerbos.checkResources(cerbosPayload);

  return {
    response: result,
  };
});
