<template>
    <h1>Cerbos and NuxtJS 3 Demo App</h1>
    <p class="description">Example NuxtJS 3 app using Cerbos for authorization</p>

    <section class="login">
        <Card title="Log in to an account">
            <img slot="icon" src="/icons/user-plus.svg" alt="" />
            <form>
            <input
                v-model="email"
                type="email"
                placeholder="Email address"
                required
            />
            <button type="submit" @click.prevent="loginUser">Login</button>
            </form>
            <img slot="action" src="/icons/arrow-right.svg" alt="" />
        </Card>
    </section>
  
    <div class="links">
      <DocsLink href="https://docs.cerbos.dev" target="_blank"
        >Read Cerbos documentation</DocsLink
      >
      <DocsLink href="https://nuxt.com/docs" target="_blank"
        >Read NuxtJS 3 documentation</DocsLink
      >
    </div>
  </template>
  
  <script setup>
    const $router = useRouter();
    const email = ref("");
    const loginUser = async () => {
        if (!email.value) {
            return alert("Please enter an email address");
        }
        const { data } = await useFetch('/api/auth/login', { query: { email: email } });

        if( data.value === 'OK' ) {
            $router.push('/');
        }
    }

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
  