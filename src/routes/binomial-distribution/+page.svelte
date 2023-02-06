<script lang="ts">
  import InputForm from "../../components/atoms/InputForm.svelte";
  import { average, correctionFactor, deviation, kurtosis, skew } from ".";
  let avg: number = 0;
  let n: number;
  let p: number;
  let valueN: string;
  let valueM: string;
  let valueP: string;

  function resolve(N: number, n: number, p: number) {
    let avg = average(n, p);
  }
</script>

<section id="binomial-distribution">
  <title
    class="flex justify-center text-center text-[25px] sm:text-[50px] font-extrabold tracking-widest"
    >Distribucion Binomial</title
  >
  <div class="divider">Datos</div>
  <div class="flex justify-center w-full">
    <div class="md:columns-4 sm:columns-1 sm:mx-10">
      <InputForm
        placeholder="Poblacion Total"
        name="Poblacion"
        variable="N"
        bind:valueVariable={valueN}
      />
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

  {#if valueN && valueM && valueP}
    <subtitle
      class="flex justify-center text-center text-[12px] sm:text-[25px] font-bold"
      >Distribucion Binomial con poblacion finita</subtitle
    >
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
</section>
