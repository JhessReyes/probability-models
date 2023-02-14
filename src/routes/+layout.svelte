<script lang="ts">
  import "../app.css";
  import Drawer from "../components/organisms/Drawer.svelte";
  import Notifications from 'svelte-notifications';
</script>

<svelte:head>
  <title>Probability Models</title>
</svelte:head>

<div class="w-full h-full">
  <main>
    <Notifications>
      <Drawer>
        <slot />
      </Drawer>
    </Notifications>
  </main>
  <footer />
</div>
