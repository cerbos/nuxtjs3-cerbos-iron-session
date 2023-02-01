<template>
  <section id="route-guard">
    <div>
      <h2>Demo: Guarded Routes</h2>
      <p>
        For this demo set a <b>role</b> on your Clerk user above and attempt to
        access the routes below. The <code>admin</code> role has access to all
        routes, while the <code>user</code> role only has access to the user
        route.
      </p>

      <div class="card">
        <DocsLink href="/documents/1" target="_blank">
          <img src="/icons/lock.svg" alt="" />
          <div>
            <h3>A Route the Admin user role can access</h3>
            <p>
              This route is <b>only</b> accessible by users with the
              <code>admin</code> role.
            </p>
          </div>
          <div>
            <img src="/icons/arrow-right.svg" alt="" />
          </div>
        </DocsLink>
      </div>
      <div class="card">
        <DocsLink href="/documents/2" target="_blank">
          <img src="/icons/external-link.svg" alt="" />
          <div>
            <h3>A Route the user who owns the resource can access</h3>
            <p>
              This route is <b>only</b> accessible by users with the
              <code>admin</code> role.
            </p>
            <p>
              This route is "guarded" by the
              <code>id</code> of the user matching the
              <code>author</code> property of the <b>document</b> resource.
            </p>
          </div>
          <div>
            <img src="/icons/arrow-right.svg" alt="" />
          </div>
        </DocsLink>
      </div>
      <div class="card">
        <DocsLink href="/documents/3" target="_blank">
          <img src="/icons/document.svg" alt="" />
          <div>
            <h3>A Route the user does not own</h3>
            <p>
              This route is "guarded" by the
              <code>id</code> of the <code>author</code> of the
              <b>document</b> resource.
            </p>
          </div>
          <div>
            <img src="/icons/arrow-right.svg" alt="" />
          </div>
        </DocsLink>
      </div>
    </div>
  </section>
</template>
