<template>
  <div>
    <Header />
    <div class="container">
      <main>
        <slot />
      </main>
    </div>
    <!-- <Footer /> -->
  </div>
</template>

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
