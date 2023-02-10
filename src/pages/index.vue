<template>
  <h1>Cerbos and NuxtJS 3 Demo App</h1>
  <p class="description">Example NuxtJS 3 app using Cerbos for authorization</p>

  <!-- Policy example -->
  <section class="cerbos-policy-example">
    <CerbosPolicy />
  </section>

  <!-- Role selection -->
  <section class="role-selection">
    <h1>Demo: Set your Role</h1>
    <p>
      For this demo set a role that will be used by Cerbos for authorization.
    </p>
    <RoleSelect />
    <p>
      Once you change the role, re-run the below request to see the impact on
      the authorization result.
    </p>
  </section>

  <!-- Access API authorized by Cerbos -->
  <section id="resource-access" class="demo-resource-authorization">
    <APIRequest />
  </section>

  <section id="route-guard" class="demo-route-guards">
    <GuardedRoutes :disabled="!role" />
  </section>
</template>

<script setup></script>

<style lang="scss">
h1 {
  margin: 0;
}

section {
  padding-top: 0.5rem;
  margin-bottom: 2rem;
}

.description {
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  color: #808080;
  text-align: center;
}

.links {
  display: flex;
  flex-direction: column;
  height: 3.5rem;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
}

.example-links {
  display: flex;
  gap: 1rem;
  width: 100%;

  :global(.card) {
    flex-basis: 50%;
  }
}

input,
select {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin-right: 1rem;
}

select {
  margin-top: 2rem;
  width: 100%;
}

button {
  background-color: #335bf1; /* Green */
  border: none;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;

  &:hover {
    background-color: #1e3dca;
    transition: background-color 0.2s ease;
  }
}

@media screen and (min-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }

  .description {
    font-size: 1.25rem;
  }

  .links {
    padding-left: 28px;
    flex-direction: row;
    height: inherit;
    margin-top: 4rem;
  }
}
</style>
