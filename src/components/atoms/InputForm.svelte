<script lang="ts">
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();
  export let placeholder: string = "";
  export let variable: string = "";
  export let name: string = "";
  export let disabled: boolean = false;
  export let valueVariable: string;
  export let step: string = "0.01";
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<div class="form-control w-full max-w-xs p-2">
  <label class="label justify-center">
    <span class="label-text">
      <strong>{variable}: </strong>
      {name}
    </span>
  </label>
  <label class="input-group">
    <slot />
    <input
      disabled={disabled ? disabled : false}
      type="number"
      placeholder={placeholder ? placeholder : ""}
      class="input input-bordered w-full max-w-xs"
      bind:value={valueVariable}
      min="0"
      {step}
      on:input={(e) => dispatch("input", valueVariable)}
      on:change={(e) => dispatch("change", valueVariable)}
      on:blur={(e) => dispatch("blur", e)}
    />
  </label>
</div>
