<template>
  <h2>Demo: Access API authorized by Cerbos</h2>
  <p>
    Now that you are authenticated as <b>{{ user.email }}</b> the following
    makes a request to the API endpoint of a sample CRM application. This will
    call Cerbos to check that you are authorized based on the resources being
    requested. The result will be returned below demonstrating the authorization
    decision from Cerbos.
  </p>

  <Card pointer :disabled="!user.role" @click.prevent="makeRequest">
    <div class="icon">
      <img slot="icon" src="/icons/server.svg" alt="">
    </div>
    <div>
      <h3>`fetch('/src/server/src/server/api/getResources')`</h3>
      <div>
        <p>
          Retrieve what permissions a user has on resouces based on upon Cerbos
          policies. The backend will make an authorization call to the Cerbos
          instance using hardcoded identity and two sample resouces.
        </p>
      </div>
    </div>
    <div class="action">
      <img slot="action" src="/icons/download.svg" alt="">
    </div>
  </Card>

  <h4>
    Response
    <em>You are signed in so the actions for two contact resources will be
      returned based on Cerbos policies</em>
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
        <tr
          v-for="{ resource, actions } in tableResults"
          :key="resource.id"
        >
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
    <template v-if="!user.role">
      <Prism source="// You must set a role in the dropdown above" />
    </template>
    <template v-else>
      <Prism source="// Click above to run the request" />
    </template>
  </template>

  <h4>/src/server/api/getResources</h4>
  <Prism :source="getResourcesSource" />
</template>

<script lang="ts" setup>
import { CheckResourcesResponse } from '@cerbos/core'

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

const tableResults = ref<TableResult[]>([])

const response = ref<CheckResourcesResponse | null>(null)
const { data } = await useFetch('/api/auth/session')

const { user } = JSON.parse(data.value as string)

// This just caches and shows the previous results when re-fetching
const loading = ref(false)
const makeRequest = async () => {
  loading.value = true

  try {
    const { data } = await useFetch('/api/getResources')
    response.value =
      data.value && typeof data.value === 'object' ? data.value.response : null

    tableResults.value = response.value
      ? (response.value.results as unknown as TableResult[])
      : []
  } catch (err) {
    console.error(err)
    tableResults.value = []
  } finally {
    loading.value = false
  }
}

const getResourcesSource = `
import { useSession } from '~/server/utils/session'
import { cerbos } from "../utils/cerbos";

export default defineEventHandler(async (event) => {
  const { user } = await useSession(event)

  const roles = user.role ? [user.role as string] : ['user']
  const email = user.email

  const cerbosPayload = {
    principal: {
      id: user.id,
      roles,
      attributes: { email }
    },
    resources: [
      {
        resource: {
          kind: 'contact',
          id: '1',
          attributes: {
            owner: user.id, // faked to demostrate ownership policy
            lastUpdated: new Date(2020, 10, 10).toISOString()
          }
        },
        actions: ['read', 'create', 'update', 'delete']
      },

      {
        resource: {
          kind: 'contact',
          id: '2',
          attributes: {
            owner: 'test2',
            lastUpdated: new Date(2020, 10, 10).toISOString()
          }
        },
        actions: ['read', 'create', 'update', 'delete']
      }
    ]
  }

  const result = await cerbos.checkResources(cerbosPayload)

  return {
    response: result
  }
})
`
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
