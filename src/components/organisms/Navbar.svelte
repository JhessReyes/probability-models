<script lang="ts">
  import Fa from "svelte-fa";
  import { faFilePrescription } from "@fortawesome/free-solid-svg-icons";
  import { page } from "$app/stores";
</script>

<!-- Navbar -->
<div class="w-full navbar bg-base-300">
  <div
    class="flex-1 px-2 mx-2 text-4xl text-primary cursor-pointer"
    aria-current={$page.url.pathname === "/" ? "page" : undefined}
  >
    <a href="/">
      <Fa icon={faFilePrescription} />
    </a>
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
    <ul class="menu menu-horizontal rounded-box">
      <!-- Navbar menu content here -->
      <li
        class="hover-bordered"
        aria-current={$page.url.pathname === "/binomial-distribution"
          ? "page"
          : undefined}
      >
        <a href="/binomial-distribution">Distribucion Binomial</a>
      </li>
      <li
        class="hover-bordered"
        aria-current={$page.url.pathname === "/m-m-1" ? "page" : undefined}
      >
        <a href="/m-m-1">Modelo M/M/1</a>
      </li>
    </ul>
  </div>
</div>
<slot />
