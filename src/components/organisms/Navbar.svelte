<script lang="ts">
  import Fa from "svelte-fa";
  import { faFilePrescription } from "@fortawesome/free-solid-svg-icons";
</script>

<!-- Navbar -->
<div class="w-full navbar bg-base-300">
  <div class="flex-1 px-2 mx-2 text-4xl text-primary">
    <Fa icon={faFilePrescription} />
  </div>
  <div class="flex-none lg:hidden">
    <label for="drawer-menu" class="btn btn-square btn-ghost">
      <!-- hamburger icon -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="inline-block w-6 h-6 stroke-current"
        ><path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        /></svg
      >
    </label>
  </div>
  <div class="flex-none hidden lg:block">
    <ul class="menu menu-horizontal">
      <!-- Navbar menu content here -->
      <li><a>Navbar Item 1</a></li>
      <li><a>Navbar Item 2</a></li>
    </ul>
  </div>
</div>
<slot />
