<template>
  <h1>Cerbos, Clerk and NuxtJS 3 Demo App</h1>
  <p class="description">
    Example NuxtJS 3 app using Clerk for authentication and Cerbos for
    authorization.
  </p>

  <template v-if="user">
    <section class="role-selection">
      <RoleSelect {role} />
    </section>

    <div class="example-links">
      <Card
        href="#resource-access"
        title="Resource Access Demo"
        disabled="{!role}"
      >
        <img slot="icon" src="/icons/server.svg" alt="" />
      </Card>
      <Card href="#route-guard" title="Route Guard Demo" disabled="{!role}">
        <img slot="icon" src="/icons/lock.svg" alt="" />
      </Card>
    </div>
  </template>
  <template v-else>
    <section class="login">
      <Card
        title="Log in/Sign up for an account"
        href="/sign-up"
        loading="{!$clerk}"
      >
        <img slot="icon" src="/icons/user-plus.svg" alt="" />
        <p>
          Login to your account or sign up for a new account maanged by
          Clerk.dev. This will provide your identity which will be used by
          Cerbos for authorization.
        </p>
        <img slot="action" src="/icons/arrow-right.svg" alt="" />
      </Card>
    </section>
  </template>

  <template v-if="user">
    <section class="cerbos-policy-example">
      <CerbosPolicy {policySource} />
    </section>

    <section id="resource-access" class="demo-resource-authorization">
      <APIRequest {getResourcesApiSource} />
    </section>

    <section id="route-guard" class="demo-route-guards">
      <GuardedRoutes disabled="{!role}" />
    </section>

    <section class="user-profile">
      <h2>Clerk - User Profile</h2>
      <Card
        title="Manage your Clerk user profile"
        @click="$clerk?.openUserProfile"
      >
        <img slot="icon" src="/icons/layout.svg" alt="" />
        <p>
          Interact with the user button, user profile, and more to preview what
          your users will see
        </p>
        <img slot="action" src="/icons/arrow-right.svg" alt="" />
      </Card>
    </section>
  </template>

  <div class="links">
    <DocsLink
      href="https://docs.clerk.dev?utm_source=github&utm_medium=starter_repos&utm_campaign=sveltekit_starter"
      >Read Clerk documentation
    </DocsLink>
    <DocsLink href="https://docs.cerbos.dev"
      >Read Cerbos documentation</DocsLink
    >
    <DocsLink href="https://sveltekit.org/docs"
      >Read sveltekit documentation</DocsLink
    >
  </div>
</template>

<script setup>
// import DocsLink from "~/components/DocsLink.vue";
</script>

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
