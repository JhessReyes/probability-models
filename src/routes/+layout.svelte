<script lang="ts">
  import "../app.css";
  import Drawer from "../components/organisms/Drawer.svelte";
</script>

<svelte:head>
  <title>Probability Models</title>
</svelte:head>

<div class="w-full h-full">
  <main>
    <Drawer>
      <slot />
    </Drawer>
  </main>
  <footer />
</div>
