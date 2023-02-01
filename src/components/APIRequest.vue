<template>
  <h2>Demo: Access API authorized by Cerbos</h2>
  <p>
    Now that you are authenticated as <b>{{ user.email }}</b> the following
    makes a request to the API endpoint of a sample CRM application. This will
    call Cerbos to check that you are authorized based on the resources being
    requested. The result will be returned below demonstrating the authorization
    decision from Cerbos.
  </p>

  <Card
    @click.prevent="makeRequest"
    pointer
    :title="`fetch('/api/getResources')${role ? ` as ${role}` : ''}`"
    :disabled="!role"
  >
    <img slot="icon" src="/icons/server.svg" alt="" />
    <p>
      Retrieve what permissions a user has on resouces based on upon Cerbos
      policies. The backend will make an authorization call to the Cerbos
      instance using your Clerk identity and two sample resouces.
    </p>
    <img slot="action" src="/icons/download.svg" alt="" />
  </Card>

  <h4>
    Response
    <em
      >You are signed in so the actions for two contact resources will be
      returned based on Cerbos policies</em
    >
  </h4>

  <template v-if="tableResults.length">
    <table>
      <thead>
        <tr>
          <td>Resource</td>
          <td>Read</td>
          <td>Update</td>
          <td>Delete</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ resource, actions } in tableResults">
          <td>{{ resource.id }}</td>
          <td>{{ actions?.read == "EFFECT_ALLOW" ? "✅" : "❌" }}</td>
          <td>{{ actions?.update == "EFFECT_ALLOW" ? "✅" : "❌" }}</td>
          <td>{{ actions?.delete == "EFFECT_ALLOW" ? "✅" : "❌" }}</td>
        </tr>
      </tbody>
    </table>
  </template>

  <template v-if="loading">
    <Prism source="// Loading..." />
  </template>
  <template v-else-if="response">
    <Prism :source="JSON.stringify(response, null, 2).trim()" language="json" />
  </template>
  <!-- Not loading & we don't have a response yet -->
  <template v-else>
    <template v-if="!role">
      <Prism source="// You must set a role in the dropdown above" />
    </template>
    <template v-else>
      <Prism source="// Click above to run the request" />
    </template>
  </template>

  <h4>/api/getResources</h4>
</template>

<script lang="ts" setup>
import { CheckResourcesResponse } from "@cerbos/core";

defineProps({
  getResourcesApiSource: {
    type: String,
    required: true,
  },
});

interface Contact {
  id: string;
  [key: string]: unknown;
}

interface Actions {
  create?: string;
  read?: string;
  update?: string;
  delete?: string;
}

interface TableResult {
  resource: Contact;
  actions: Actions;
  validationErrors: unknown[];
}

const userStore = useUserStore();

const user = computed(() => userStore.user);
const role = computed(() => user.value.role);

const tableResults = ref<TableResult[]>([]);

const response = ref<CheckResourcesResponse | null>(null);

// This just caches and shows the previous results when re-fetching
const loading = ref(false);
const makeRequest = async () => {
  loading.value = true;

  if (role) {
    try {
      const { data } = await useFetch(`/api/getResources`, {
        params: {
          user: JSON.stringify(user.value),
        },
      });
      response.value =
        data.value && typeof data.value === "object"
          ? data.value.response
          : null;

      tableResults.value = response.value
        ? (response.value.results as unknown as TableResult[])
        : [];
    } catch (err) {
      console.error(err);
      tableResults.value = [];
    } finally {
      loading.value = false;
    }
  }
};
</script>

<style lang="scss">
h4 em {
  font-weight: normal;
  margin-left: 0.5rem;
}

table {
  width: 80%;
  background: #f2f2f2;
  padding: 0.2em;
  margin: 0 auto;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

thead {
  font-weight: 600;
}
</style>
