<template>
  <select :value="currentRole" ref="roleSelect" @change="updateRole">
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

const currentRole = ref("user");

const userStore = useUserStore();
const user = computed(() => userStore.user);

const roleSelect = ref();

function updateRole() {
  const newRole = roleList.find(
    (role) => role.value === roleSelect.value.value
  );

  if (newRole.value) {
    userStore.updateUser({ role: newRole.value });
  }
}

onMounted(() => {
  // Prepopulate current role based on what type of user is logged in
  currentRole.value = user.value.role;
});
</script>
