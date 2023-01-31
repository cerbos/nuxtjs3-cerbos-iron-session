<template>
  <select value="user" ref="roleSelect" @change="updateRole">
    <option v-for="role in roleList" :value="role.value">
      {{ role.label }}
    </option>
  </select>
</template>

<script setup>
defineProps({
  roleList: { type: Array, default: [] },
});

const roleList = [
  {
    value: "user",
    label: "User",
  },
  {
    value: "admin",
    label: "Admin",
  },
];

const userStore = useUserStore();

const roleSelect = ref();

function updateRole() {
  const newRole = roleList.find(
    (role) => role.value === roleSelect.value.value
  );

  if (newRole.value) {
    userStore.updateUser({ role: newRole.value });
  }
}
</script>
