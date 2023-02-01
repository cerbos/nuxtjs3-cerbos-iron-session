<template>
  <div class="container">
    <main class="main">
      <div class="document">
        <h1 class="title">{{ data.title }}</h1>
        <p>{{ data.blurb }}</p>
        <img v-if="data.icon" :src="`/icons/${data.icon}.svg`" alt="" />

        <h4>The load function for this document page:</h4>
        <Prism
          source="`export let loader: LoaderFunction = async (args) => {
    // fetch the user from the session
    const user = await requireUser(args);
  
    // cerbos requires an array of \`roles\` so we just wrap \`role\` in an array
    const roles = user.publicMetadata.role ? [user.publicMetadata.role as string] : [];
    const { params } = args;
  
    if (!params.id) {
      throw json('Document ID required', { status: 400 });
    }
  
    // query for the minimal infomation needed to pass to cerbos for an authorization check
    const documentAttrs = await getDocumentAttributesById(params.id);
  
    // if we can't find a document matching the route param id, throw a 404
    if (!documentAttrs) {
      throw json('Not Found', { status: 404 });
    }
  
    // ** fake the ownership of the document for the purposes of this demo **
    if (documentAttrs?.author === 'tbd') {
      documentAttrs.author = user.id;
    }
  
    const isAllowed = await cerbos.isAllowed({
      principal: { id: user.id, roles },
      resource: {
        kind: 'document',
        id: params.id,
        attributes: documentAttrs,
      },
      action: 'view',
    });
  
    if (!isAllowed) {
      throw json('Forbidden', { status: 403 });
    }
  
    // get the full document for the page
    const document = await getDocumentById(params.id);
  
    return json(document);
  };
  `"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { getDocumentById, getDocumentAttributesById } from "~/db";

const $route = useRoute();

const data = ref({
  title: "???",
  blurb: "",
  icon: "lock",
});

const userStore = useUserStore();
// fetch the user from the user store
const user = computed(() => userStore.user);
// cerbos requires an array of `roles` so we just wrap `role` in an array
const roles = computed(() => [user.value.role]);

onMounted(async () => {
  // query for the minimal infomation needed to pass to cerbos for an authorization check
  const documentAttrs = await getDocumentAttributesById($route.params.id);

  console.log("documentAttrs", documentAttrs);

  // if we can't find a document matching the route param id, throw a 404
  if (!documentAttrs) {
    throw error(404, "Document not found");
  }

  // ** fake the ownership of the document for the purposes of this demo **
  if (documentAttrs?.author === "tbd") {
    documentAttrs.author = user.id;
  }

  const { data } = await useFetch(`/api/isAllowed`, {
    body: {
      principal: { id: user.id, roles },
      resource: {
        kind: "document",
        id: $route.params.id,
        attributes: documentAttrs,
      },
      action: "view",
    },
  });

  console.log("data [isAllowed]: ", data.value);

  const isAllowed = false;

  if (!isAllowed) {
    throw Error("Forbidden", { status: 403 });
  }

  // get the full document for the page
  return getDocumentById($route.params.id);
});
</script>

<style lang="scss" scoped></style>
