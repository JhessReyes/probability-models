<script lang="ts">
  import { Lq, Ls, p, Pn, Wq, Ws } from ".";
  import InputForm from "../../components/atoms/InputForm.svelte";
  import Stat from "../../components/atoms/Stat.svelte";

  let rateArrival: any;
  let rateService: any;
  let valueWq: any;
  let valueWs: any;
  let valueLq: any;
  let valueLs: any;
  let valueBusy: any;
  let valueN0: any;
  let valueN: any;

  let selected = "===";
  let options = ["===", "<="];
  //OnChange Input
  function handleChange(e: Event, variable: string) {
    if (variable === "tll" || variable === "tss") {
      if (rateArrival && rateService) {
        valueWq = Wq(rateArrival, rateService);
        /*valueWs = Ws(parseFloat(valueWq), rateService); */
        valueWs = Ws(rateArrival, rateService);
        /* if (!isFinite(valueWs)) valueWs = "Infinito"; */
        valueLq = Lq(rateArrival, parseFloat(valueWq));
        valueLs = Ls(rateArrival, parseFloat(valueWs));
        valueBusy = p(rateArrival, rateService);
      }
    }
  }
</script>

<title
  class="flex justify-center text-center text-[25px] sm:text-[50px] font-extrabold"
>
  Modelo M/M/1
</title>

<div class="divider">Datos</div>
<div class="flex justify-center w-full">
  <div class="lg:columns-2 md:columns-1 sm:mx-10">
    <InputForm
      placeholder="Tiempo Llegada"
      name="Tiempo Llegada (TTL)"
      variable="λ"
      bind:valueVariable={rateArrival}
      on:change={(e) => handleChange(e, "tll")}
    />
    <InputForm
      placeholder="Tiempo Servicio"
      name="Tiempo Servicio (TS)"
      variable="μ"
      bind:valueVariable={rateService}
      on:change={(e) => handleChange(e, "tss")}
    />
    <div>
      <InputForm
        placeholder="N"
        name="No. Clientes"
        variable="n"
        bind:valueVariable={valueN}
      >
        {#if selected !== "==="}
          <input
            type="number"
            placeholder={"N0"}
            class="input input-bordered w-full max-w-xs"
            min="0"
            bind:value={valueN0}
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
  </div>
</div>
<div class="divider">Resultados</div>
<div class="flex justify-center w-full">
  <div class="lg:columns-4 md:columns-1 sm:mx-10">
    <InputForm
      placeholder="Tiempo Espera (cola)"
      name="Tiempo Espera (cola)"
      variable="Wq"
      bind:valueVariable={valueWq}
    />
    <InputForm
      placeholder="Tiempo Espera (sistema)"
      name="Tiempo Espera (sistema)"
      variable="Ws"
      bind:valueVariable={valueWs}
    />
    <InputForm
      placeholder="Clientes (cola)"
      name="Clientes (cola)"
      variable="Lq"
      bind:valueVariable={valueLq}
    />
    <InputForm
      placeholder="Clientes (sistema)"
      name="Clientes (sistema)"
      variable="Ls"
      bind:valueVariable={valueLs}
    />
  </div>
</div>
<div class="flex justify-center w-full">
  <div class="lg:columns-2 md:columns-1 sm:mx-10">
    <InputForm
      placeholder="Uso del sistema"
      name="Uso del sistema"
      variable="p"
      bind:valueVariable={valueBusy}
    />
  </div>
</div>
{#if rateArrival && rateService && valueN}
  <Stat statTitle="Probabilidad segun condiciones de exito">
    {#if selected === "==="}
      {@const resPn = Pn(rateArrival, rateService, valueN)}

      {resPn + " = " + (parseFloat(resPn) * 100).toFixed(7) + "%"}
    {:else}{/if}
  </Stat>
{/if}
