<template>
  <NuxtLink class="link" :to="href">
    <span class="linkText"><slot /></span>
  </NuxtLink>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  href: { type: String, default: undefined },
});
</script>

<style lang="scss" scoped>
a {
  color: #335bf1;
  font-weight: 600;
}

@media screen and (min-width: 768px) {
  a {
    padding-right: 28px;
  }

  a:hover,
  a:focus {
    background: url(/icons/external-link.svg) no-repeat right;
    background-size: 20px 20px;
  }

  .linkText:hover {
    border-bottom: 2px solid #335bf1;
  }
}
</style>
