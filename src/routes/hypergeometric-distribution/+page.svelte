<script lang="ts">
  import { page } from "$app/stores";
  import InputForm from "../../components/atoms/InputForm.svelte";

  export let valueN: string = $page.url.searchParams.get("valueN") || "";
  export let valueM: string = $page.url.searchParams.get("valueM") || "";
  export let valueP: string = $page.url.searchParams.get("valueP") || "";
  export let valueQ: string = $page.url.searchParams.get("valueQ") || "";
  export let valueK: string = $page.url.searchParams.get("valueK") || "";
  export let valueX: string = $page.url.searchParams.get("valueX") || "";
  export let valueX0: string = $page.url.searchParams.get("valueX0") || "";
  export let selected = $page.url.searchParams.get("selected") || "=";
  export let options = ["=", "<="];
  export let onlyResults = false;
</script>

<section id="hypergeometric-distribution">
  {#if !onlyResults}
    <title
      class="flex justify-center text-center text-[25px] sm:text-[50px] font-extrabold"
      >Distribución Hipergeométrica</title
    >
    <div class="divider">Datos</div>
    <div class="flex justify-center w-full">
      <div class="md:columns-3 sm:columns-1 sm:mx-10">
        <InputForm
          placeholder="Poblacion Total"
          name="Poblacion"
          variable="N"
          bind:valueVariable={valueN}
        />
        <div>
          <InputForm
            placeholder="Exitos"
            name="Exitos"
            variable="x"
            bind:valueVariable={valueX}
          >
            {#if selected !== "="}
              <input
                type="number"
                placeholder={"x0"}
                class="input input-bordered w-full max-w-xs"
                min="0"
                bind:value={valueX0}
              />
            {/if}
            <select
              class="select select-md select-secondary btn-secondary rounded-none mx-2"
              bind:value={selected}
            >
              {#each options as value}<option {value}>{value}</option>{/each}
            </select>
          </InputForm>
        </div>
        <InputForm
          placeholder="Muestra"
          name="Muestra"
          variable="n"
          bind:valueVariable={valueM}
        />
      </div>
    </div>
    <div class="flex justify-center w-full">
      <div
        class="${valueN
          ? 'md:columns-3'
          : 'md:columns-2'} flex sm:columns-1 sm:mx-10"
      >
        <!-- If insert the valueQ show the results to the other variables-->
        {#if valueQ}
          {@const valueP = 100 - parseFloat(valueQ)}
          {@const valueK = (valueP * parseFloat(valueN)) / 100 || 0}
          <InputForm
            disabled={true}
            valueVariable={valueK.toFixed(2).toString()}
            name="n° individuos"
            variable="K"
          />
          <InputForm
            disabled={true}
            valueVariable={valueP.toFixed(2).toString()}
            name="% exito"
            variable="p"
          />
        {/if}
        <!-- end valueQ -->

        {#if !valueP && !valueQ && valueN}
          <InputForm
            placeholder="n° Individuos"
            bind:valueVariable={valueK}
            name="n° Individuos"
            variable="K"
          />
        {/if}

        <!-- If insert the valueP show the results to the other variables-->
        {#if valueP}
          {@const valueK = (parseFloat(valueP) * parseFloat(valueN)) / 100 || 0}
          <InputForm
            disabled={true}
            valueVariable={valueK.toFixed(2).toString()}
            name="n° individuos"
            variable="K"
          />
        {/if}

        {#if !valueK && !valueQ}
          <InputForm
            placeholder="Probabilidad exito"
            name="% exito"
            variable="p"
            bind:valueVariable={valueP}
          />
        {/if}

        {#if valueP}
          {@const valueQ = 100 - parseFloat(valueP)}
          <InputForm
            disabled={true}
            valueVariable={valueQ.toFixed(2).toString()}
            name="% fracaso"
            variable="q"
          />
        {/if}
        <!-- end valueP -->

        {#if !valueK && !valueP}
          <InputForm
            placeholder="Probabilidad fracaso"
            name="% fracaso"
            variable="q"
            bind:valueVariable={valueQ}
          />
        {/if}

        <!-- If insert the valueK show the results to the other variables-->
        {#if valueK}
          <!-- {#if !valueN}
          {required("N (Poblacion)")}
        {/if} -->
          {@const valueP = (parseFloat(valueK) / parseInt(valueN)) * 100}
          {@const valueQ = 100 - parseFloat(valueP.toFixed(2))}
          <InputForm
            disabled={true}
            valueVariable={valueP.toFixed(2).toString()}
            name="% exito"
            variable="p"
          />
          <InputForm
            disabled={true}
            valueVariable={valueQ.toFixed(2).toString()}
            name="% fracaso"
            variable="q"
          />
        {/if}
        <!-- end valueK -->

        <!-- {#if parseInt(valueP) > 100 || parseInt(valueQ) > 100}
        {bigger0()}
      {/if}
      {#if parseInt(valueP) < 0 || parseInt(valueQ) < 0}
        {less0()}
      {/if} -->
      </div>
    </div>
    <div class="divider">Resultados</div>
  {/if}
</section>
