<script lang="ts">
  import InputForm from "../../components/atoms/InputForm.svelte";
  import {
    average,
    binomialProbability,
    binomialProbabilityN,
    correctionFactor,
    deviation,
    kurtosis,
    optionsBinomialDistribution,
    skew,
  } from ".";
  import BinomialChart from "../../components/organisms/BinomialChart.svelte";
  let valueN: string;
  let valueM: string;
  let valueP: string;
  let valueX: string;
  let valueX0: string;
  let selected = "=";
  let options = ["=", "<="];
</script>

<section id="binomial-distribution">
  <title
    class="flex justify-center text-center text-[25px] sm:text-[50px] font-extrabold tracking-widest"
    >Distribucion Binomial</title
  >
  <div class="divider">Datos</div>
  <div class="flex justify-center w-full">
    <div
      class={`${
        valueP
          ? valueX || valueN
            ? "md:columns-4"
            : "md:columns-5"
          : "md:columns-4 sm:columns-1 sm:mx-10"
      } `}
    >
      {#if !valueX}
        <InputForm
          placeholder="Poblacion Total"
          name="Poblacion"
          variable="N"
          bind:valueVariable={valueN}
        />
      {/if}
      {#if !valueN}
        <div>
          <InputForm
            placeholder="Exitos"
            name="Exitos"
            variable="x"
            bind:valueVariable={valueX}
          >
            {#if !valueN && valueX}
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
            {/if}
          </InputForm>
        </div>
      {/if}
      <InputForm
        placeholder="Muestra"
        name="Muestra"
        variable="n"
        bind:valueVariable={valueM}
      />
      <InputForm
        placeholder="Probabilidad exito"
        name="% exito"
        variable="p"
        bind:valueVariable={valueP}
      />
      {#if parseInt(valueP) > 100}
        <div class="alert alert-error shadow-lg sm:mx-10">
          no puede ser mayor a 100
        </div>
      {/if}
      {#if parseInt(valueP) < 0}
        <div class="alert alert-error shadow-lg sm:mx-10">
          no puede ser menor a 0
        </div>
      {/if}
      {#if valueP}
        {@const valueQ = 100 - parseFloat(valueP)}
        <InputForm
          disabled={true}
          valueVariable={valueQ.toFixed(2).toString()}
          name="% fracaso"
          variable="p"
        />
      {/if}
    </div>
  </div>
  <div class="divider">Resultados</div>

  <!-- title validations -->
  {#if valueN && valueM && valueP && valueN >= valueM}
    <subtitle
      class="flex justify-center text-center text-[12px] sm:text-[25px] font-bold"
      >Distribucion Binomial con poblacion Finita</subtitle
    >
  {:else if valueM && valueP && valueX}
    <subtitle
      class="flex justify-center text-center text-[12px] sm:text-[25px] font-bold"
      >Distribucion Binomial con poblacion Infinita</subtitle
    >
  {/if}

  {#if valueM && valueP}
    <div class="stats shadow flex">
      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
          >
        </div>
        <div class="stat-title">Media</div>
        <div class="stat-value">
          {average(parseInt(valueM), parseFloat(valueP))}
        </div>
      </div>

      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
          >
        </div>
        <div class="stat-title">Curtosis</div>
        <div class="stat-value">
          {kurtosis(parseInt(valueM), parseFloat(valueP))}
        </div>
      </div>
      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
          >
        </div>
        <div class="stat-title">Sesgo</div>
        <div class="stat-value">
          {skew(parseInt(valueM), parseFloat(valueP))}
        </div>
      </div>
    </div>
  {/if}

  <!-- infinite contidions -->
  {#if valueM && valueP && parseInt(valueX) >= 0 && !valueN}
    <div class="stats shadow flex">
      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
          >
        </div>
        <div class="stat-title justify-center">
          Probabilidad segun condiciones de exito
        </div>
        <div class="stat-value">
          {#if selected !== "="}
            {binomialProbabilityN(
              parseInt(valueX0),
              parseInt(valueX),
              parseInt(valueM),
              parseFloat(valueP)
            ) +
              " = " +
              (
                parseFloat(
                  binomialProbabilityN(
                    parseInt(valueX0),
                    parseInt(valueX),
                    parseInt(valueM),
                    parseFloat(valueP)
                  )
                ) * 100
              ).toFixed(2) +
              "%"}
          {:else}
            {binomialProbability(
              parseInt(valueX),
              parseInt(valueM),
              parseFloat(valueP)
            ) +
              " = " +
              (
                parseFloat(
                  binomialProbability(
                    parseInt(valueX),
                    parseInt(valueM),
                    parseFloat(valueP)
                  )
                ) * 100
              ).toFixed(2) +
              "%"}
          {/if}
        </div>
      </div>
    </div>
  {/if}

  <!-- finite conditions -->
  {#if valueN && valueM && valueP && valueN >= valueM}
    <div class="stats shadow flex">
      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
          >
        </div>
        <div class="stat-title">Factor de Corrección</div>
        <div class="stat-value">
          {parseFloat(correctionFactor(parseInt(valueN), parseInt(valueM)))}
        </div>
      </div>
      <div class="stat">
        <div class="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block w-8 h-8 stroke-current"
            ><path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            /></svg
          >
        </div>
        <div class="stat-title">Desviación</div>
        <div class="stat-value">
          {deviation(
            parseFloat(correctionFactor(parseInt(valueN), parseInt(valueM))),
            parseInt(valueM),
            parseFloat(valueP)
          )}
        </div>
      </div>
    </div>
  {/if}
  {#if valueM && valueP && parseInt(valueP) <= 100}
    <div class="divider">Grafico</div>
    <BinomialChart
      options={optionsBinomialDistribution(
        parseInt(valueM),
        parseFloat(valueP),
        "Distribucion Binomial"
      )}
    />
  {/if}
</section>
