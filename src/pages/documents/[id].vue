<template>
  <div class="container">
    <main class="main">
      <template v-if="documentLoading">
        <h1>Loading document...</h1>
      </template>
      <template v-else>
        <div class="document">
          <h1 class="title">
            {{ document.title }}
          </h1>
          <p>{{ document.blurb }}</p>
          <img
            v-if="document.icon"
            :src="`/icons/${document.icon}.svg`"
            alt=""
          >

          <h4>The load function for this document page:</h4>
          <Prism
            source="
import { getDocumentAttributesById } from '~/db';
import { cerbos } from '../utils/cerbos';

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
  "
          />
        </div>
      </template>
    </main>
  </div>
</template>

<script setup>
import { getDocumentById } from '~/db'

const $route = useRoute()

const document = ref({
  title: '???',
  blurb: '',
  icon: 'lock'
})

const documentLoading = ref(true)

onMounted(async () => {
  documentLoading.value = false

  document.value = await getDocumentById($route.params.id)
})

definePageMeta({
  validate: async (route) => {
    const { data: isAllowed } = await useFetch('/api/isAllowed',
      {
        headers: useRequestHeaders(),
        query: { documentId: route.params.id }
      })
    return isAllowed.value
  }
})
</script>

<style lang="scss" scoped></style>
