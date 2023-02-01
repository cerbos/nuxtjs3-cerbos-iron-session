<template>
  <div>
    <div v-if="userIsLoading" class="loading--container">
      <h1>Loading...</h1>
    </div>
    <NuxtLayout v-else>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
const userStore = useUserStore();
const userIsLoading = computed(() => userStore.loading);

onMounted(() => {
  userStore.loadUserDetails();
});
</script>

<style lang="scss" scoped>
@import "./styles/app.scss";

.loading--container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
