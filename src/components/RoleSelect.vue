<template>
  <select ref="roleSelect" :value="currentRole" @change="updateRole">
    <option v-for="role in roleList" :value="role.value">
      {{ role.label }}
    </option>
  </select>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const roleList = [
  {
    value: 'user',
    label: 'User'
  },
  {
    value: 'admin',
    label: 'Admin'
  }
]

const roleSelect = ref()
const { data } = await useFetch('/api/auth/session', {
  headers: useRequestHeaders()
})

const session = JSON.parse(data.value)
const currentRole = ref(session.user.role)

onMounted(() => {
  roleSelect.value.value = currentRole.value
})

function updateRole () {
  const newRole = roleList.find(
    role => role.value === roleSelect.value.value
  )

  if (newRole.value) {
    useFetch('/api/auth/updateRole', { query: { role: newRole.value } })
  }
}
</script>
