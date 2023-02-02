<template>
  <header class="header">
    <div class="left">
      <DocsLink href="/" class="logo">
        <Image src="/logo.svg" width="32" height="32" alt="Logo" />
        <span class="appName">NuxtJS 3 + Cerbos Demo App</span>
      </DocsLink>
    </div>
    <button v-if="session.user" @click="logoutUser">Logout</button>
  </header>
</template>

<script setup>
const { data } = await useFetch('/api/auth/session', {
  headers: useRequestHeaders(),
});

const session = JSON.parse(data.value);
const $router = useRouter();
const $route = useRoute();

if ( $route.path !== "/login") {
  if ( !session || !session.user ) {
    $router.push('/login');
  }
}

async function logoutUser() {
  const confirmed = confirm("Are you sure you want to logout?");
  if (confirmed) {
      const { data } = await useFetch('/api/auth/logout');

      if( data.value === 'OK' ) {
          $router.push('/login');
      }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.appName {
  margin-left: 12px;
  font-weight: bold;
  color: #335bf1;
}

.left,
.right {
  display: flex;
  align-items: center;
}

.right > :not(:first-child) {
  margin-left: 1rem;
}

@media screen and (min-width: 768px) {
  .header {
    padding: 1rem 2rem;
  }
}
</style>
