<template>
  <!-- <Header /> -->
  <div class="container">
    <main>
      <slot />
    </main>
  </div>
  <!-- <Footer /> -->
</template>

<script lang="ts">
// import { setContext } from 'svelte';
// import Header from '$lib/components/Header.svelte';
// import Footer from '$lib/components/Footer.svelte';
// import { PUBLIC_CLERK_FRONTEND_API } from '$env/static/public';
// import { createClerkStore } from '$lib/clerk-svelte';

// const clearkStore = createClerkStore(PUBLIC_CLERK_FRONTEND_API);
// setContext('clerk', clearkStore);
</script>

<style lang="scss">
@import "../styles/app.scss";

main {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 800px;
  padding-top: 2rem;
  flex: 1;
  margin: 0 auto;
}
@media screen and (min-width: 768px) {
  main {
    padding-top: 4.5rem;
  }
}
</style>
