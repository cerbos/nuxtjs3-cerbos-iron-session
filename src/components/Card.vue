<template>
  <div class="card" :class="{ loading, disabled, pointer }">
    <section class="card-content">
      <slot />
    </section>
  </div>
</template>

<script setup>
defineProps({
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  pointer: { type: Boolean, default: false }
})
</script>

<style lang="scss">
$hover-color: #335bf1;

.card {
  border: 2px solid #fff;
  border-radius: 0.5em;
  transition: color 0.15s ease, border-color 0.15s ease;
}

.card-content {
  font-size: 1rem;
  line-height: 1.25;
  color: #808080;
}

.card-content :global(p) {
  margin: 0;
}

.disabled {
  opacity: 0.5;
  pointer-events: none;
}
.pointer {
  cursor: pointer;

  &:hover {
    border-color: $hover-color;
    transition: border-color 0.2s ease;

    h3 {
      color: $hover-color;
      transition: color 0.2s ease;
    }
  }
}

.loading {
  background-image: radial-gradient(
      circle 14px at 46px 46px,
      #f2f2f2 99%,
      transparent 0
    ),
    linear-gradient(
      100deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.5) 50%,
      rgba(255, 255, 255, 0) 80%
    ),
    linear-gradient(#f2f2f2 16px, transparent 0),
    linear-gradient(#f2f2f2 16px, transparent 0),
    linear-gradient(#f2f2f2 16px, transparent 0);

  background-repeat: repeat-y;

  background-size: 100px 200px, /* circle */ 50px 200px,
    /* highlight */ 150px 200px, 350px 200px, 200px 200px;

  background-position: 0 0, /* circle */ 0 0, /* highlight */ 70px 36px,
    70px 58px, 70px 80px;

  animation: shine 1s infinite;
}

.loading > * {
  visibility: hidden;
}

@keyframes shine {
  to {
    background-position: 0 0, 100% 0, 70px 36px, 70px 58px, 70px 80px;
  }
}

.card h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.5;
}

.card-content {
  background: transparent;
  border: none;
  display: grid;
  grid-template-columns: 24px 1fr 24px;
  gap: 1em;
  padding: 1.5em 1em;
  text-align: left;
  color: inherit;
  text-decoration: none;
}

.action {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.icon,
.action {
  padding-top: 0.2rem;
}

@media screen and (min-width: 768px) {
  .card {
    border-color: #f2f2f2;
  }

  .card-content {
    grid-template-columns: 24px 1fr 42px;
    padding: 2em;
    font: inherit;
  }
}
</style>
