<template>
  <div class="container">
    <main class="main">
      <template v-if="documentLoading">
        <h1>Loading document...</h1>
      </template>
      <template v-else>
        <div class="document">
          <h1 class="title">{{ document.title }}</h1>
          <p>{{ document.blurb }}</p>
          <img
            v-if="document.icon"
            :src="`/icons/${document.icon}.svg`"
            alt=""
          />

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
      </template>
    </main>
  </div>
</template>

<script setup>
import { getDocumentById } from "~/db";

const $route = useRoute();

const document = ref({
  title: "???",
  blurb: "",
  icon: "lock",
});

const documentLoading = ref(true);

onMounted(async () => {
  documentLoading.value = false;

  document.value = await getDocumentById($route.params.id);
});

definePageMeta({
  middleware: ["auth"],
});
</script>

<style lang="scss" scoped></style>
