<script lang="ts">
  import "../app.css";
  import Drawer from "../components/organisms/Drawer.svelte";
</script>

<svelte:head>
  <title>Probability Models</title>
  <script
    src="https://kit.fontawesome.com/yourcode.js"
    crossorigin="anonymous"
  ></script>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
  />
</svelte:head>

<div class="w-full h-full">
  <main>
    <Drawer>
      <slot />
    </Drawer>
  </main>
  <footer />
</div>
