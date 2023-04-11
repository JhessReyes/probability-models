<script lang="ts">
  import { Lq, Ls, p, Pn, PWqt, PWst, Wq, Ws } from ".";
  import InputForm from "../../components/atoms/InputForm.svelte";
  import Stat from "../../components/atoms/Stat.svelte";
  import { BinomialChart } from "../../components/organisms";
  import { optionsChartsTails } from "../schema";

  let rateArrival: any;
  let rateService: any;
  let valueWq: any;
  let valueWs: any;
  let valueLq: any;
  let valueLs: any;
  let valueBusy: any;
  let valueN0: any;
  let valueN: any;
  let valueT: any = 0;

  /* $: console.log(valueBusy); */
  $: valueBusy = (valueWq / valueWs).toString() || p(rateArrival, rateService);
  let selected = "===";
  let options = ["===", "<="];
  //OnChange Input
  function handleChange(e: Event, variable: string) {
    if (rateArrival || rateService) {
      if (rateArrival && rateService) {
        valueWq = Wq(rateArrival, rateService);
      } else valueWq = (variable === "wq" || valueWq) && valueWq;
      if (rateService) {
        valueWs = Ws(parseFloat(valueWq), rateService);
      } else valueWs = (variable === "ws" || valueWs) && valueWs;

      /* if (!isFinite(valueWs)) valueWs = "Infinito"; */
      valueLq = Lq(
        rateArrival || (1 - valueWs * rateService) / -valueWs,
        parseFloat(valueWq)
      );
      valueLs = Ls(
        rateArrival || (1 - valueWs * rateService) / -valueWs,
        parseFloat(valueWs)
      );
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
  <div class="lg:columns-4 md:columns-1 sm:mx-10">
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
        step="1"
        bind:valueVariable={valueN}
      >
        {#if selected !== "==="}
          <input
            type="number"
            placeholder={"N0"}
            class="input input-bordered w-full max-w-xs"
            min="0"
            step="1"
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
      <InputForm
        placeholder="tiempo de espera"
        name="Tiempo de espera"
        variable="t"
        bind:valueVariable={valueT}
      />
    </div>
  </div>
</div>
<div class="divider">Resultados</div>
<div class="flex justify-center w-full">
  <div class="lg:columns-2 md:columns-1 sm:mx-10">
    <InputForm
      placeholder="Tiempo Espera (cola)"
      name="Tiempo Espera (cola)"
      variable="Wq"
      bind:valueVariable={valueWq}
      on:change={(e) => handleChange(e, "wq")}
    />
    <InputForm
      placeholder="Tiempo Espera (sistema)"
      name="Tiempo Espera (sistema)"
      variable="Ws"
      bind:valueVariable={valueWs}
      on:change={(e) => handleChange(e, "ws")}
    />
  </div>
</div>
<div class="flex justify-center w-full">
  <div class="lg:columns-3 md:columns-1 sm:mx-10">
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
    <InputForm
      placeholder="Uso del sistema"
      name="Uso del sistema"
      variable="ρ"
      bind:valueVariable={valueBusy}
      on:input={(e) => (valueBusy = e?.detail)}
    />
  </div>
</div>
<div class="flex justify-center w-full">
  <div class="lg:columns-3 md:columns-1 sm:mx-10">
    <InputForm
      placeholder={`Probabilidad de t (cola)`}
      name={`Probabilidad de t(${valueT}) (cola)`}
      variable="P(Wq > t)"
      valueVariable={PWqt(
        valueBusy,
        rateService || 1 / (valueWs - valueWq),
        valueT
      )}
    />
    <InputForm
      placeholder={`Probabilidad de t (sistema)`}
      name={`Probabilidad de t(${valueT}) (sistema)`}
      variable="P(Ws > t)"
      valueVariable={PWst(
        valueBusy,
        rateService || 1 / (valueWs - valueWq),
        valueT
      )}
    />
    <InputForm
      placeholder="Oscio del sistema"
      name="Ocio del sistema"
      variable="1-ρ"
      valueVariable={(1 - valueBusy).toString()}
      on:input={(e) => (valueBusy = 1 - e?.detail)}
    />
  </div>
</div>
{#if (rateArrival || (1 - valueWs * rateService) / -valueWs) && (rateService || 1 / (valueWs - valueWq)) && valueN >= 0}
  <Stat statTitle="Probabilidad segun condiciones de exito P({valueN})">
    {#if selected === "==="}
      {@const resPn = Pn(
        rateArrival || (1 - valueWs * rateService) / -valueWs,
        rateService || 1 / (valueWs - valueWq),
        valueN
      )}

      {resPn + " = " + (parseFloat(resPn) * 100).toFixed(7) + "%"}
    {:else}{/if}
  </Stat>
  <div class="divider">Graficos Probabilidad</div>
  <div>
    <BinomialChart
      options={optionsChartsTails(
        valueN,
        "Graficos",
        "line",
        rateArrival || (1 - valueWs * rateService) / -valueWs,
        rateService || 1 / (valueWs - valueWq),
        ["mm1"]
      )}
    />
  </div>
{/if}
