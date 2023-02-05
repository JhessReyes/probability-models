<script lang="ts">
  import Navbar from "./Navbar.svelte";
</script>

<div class="drawer">
  <input id="drawer-menu" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col">
    <Navbar>
      <slot />
    </Navbar>
  </div>
  <div class="drawer-side">
    <label for="drawer-menu" class="drawer-overlay" />
    <div class="menu p-4 w-80 bg-base-100">
        
      <label for="drawer-menu" class="drawer-overlay btn btn-square btn-ghost">
        <!-- close icon -->
        <svg
          class="swap-on fill-current"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 512 512"
          ><polygon
            points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"
          /></svg
        >
      </label>
      <ul>
        <!-- Sidebar content here -->
        <li><a>Sidebar Item 1</a></li>
        <li><a>Sidebar Item 2</a></li>
      </ul>
    </div>
  </div>
</div>
