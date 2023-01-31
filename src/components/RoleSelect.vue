<template>
  <select value="user" @change="updateRole">
    <option v-for="role in roleList" :value="role.name">
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
    name: "user",
    label: "User",
  },
  {
    name: "admin",
    label: "Admin",
  },
];

const { updateUser } = useUser();

function updateRole() {
  const newRole = roleList.find((role) => role.name === roleSelect.value);
  updateUser({ role: newRole });
}
</script>
