<script lang="ts">
  export let status: boolean = false;
  export let tooltip: string = "";
</script>

<div class={`${tooltip && " tooltip tooltip-right"}`} data-tip={tooltip}>
  <input
    type="checkbox"
    class="toggle toggle-success"
    bind:checked={status}
    on:change
  />
</div>
