<script lang="ts">
  import { InputForm, Stat } from "../components/atoms";
  import { getNotificationsContext } from "svelte-notifications";
  import { BinomialChart, ProbabilityTable } from "../components/organisms";

  import {
    average,
    binomialProbability,
    binomialProbabilityN,
    correctionFactor,
    dataProbabilityTable,
    deviation,
    kurtosis,
    skew,
  } from "./binomial-distribution";

  import {
    hyperAverage,
    hypergeometricProbability,
    hypergeometricProbabilityN,
    standarDeviation,
  } from "./hypergeometric-distribution";

  import {
    dataPoissonTable,
    poissonProbability,
    poissonProbabilityN,
  } from "./poisson-distribution";
  import Toggle from "../components/atoms/Toggle.svelte";
  import { optionsCharts } from "./schema";

  const { addNotification } = getNotificationsContext();

  const required = (variable: string, type: string = "error") => {
    addNotification({
      text: "La variable: " + variable + " es requerida",
      position: "bottom-right",
      type: type,
      removeAfter: 2000,
    });
    return "";
  };
  const bigger0 = () => {
    addNotification({
      text: "No puede ser mayor a 100",
      position: "bottom-right",
      type: "error",
      removeAfter: 2000,
    });
    return "";
  };
  const less0 = () => {
    addNotification({
      text: "No puede ser menor a 0",
      position: "bottom-right",
      type: "error",
      removeAfter: 2000,
    });
    return "";
  };
  let valueN: any;
  let valueM: any;
  let valueP: any;
  let valueQ: any;
  let valueK: any;
  let valueX: any;
  let valueX0: any;
  let valueTol: any;
  let valueCF: any;
  let valueAvg: any;
  let valueDeviation: any;
  let valueKurtosis: any;
  let valueSkew: any;
  let typeSkew: string;
  let typeKurt: string;
  let valueFC: any;

  let toleranceFind: any;
  let toleranceBinomialFind: any;
  let selected = "=";
  let options = ["=", "<="];
  let hypergeometric: boolean = false;
  let poisson: boolean = false;
  let showPoisson: boolean = false;
  let showBothProbability: boolean = false;

  //OnChange Input
  function handleChange(e: Event, variable: string) {
    //calculate variables
    let varQ = 100 - parseFloat(valueP);
    let varP = 100 - parseFloat(valueQ);
    let varK = 0;
    let varPK = 0;
    if (valueN) {
      if (variable === "avg") valueP = (valueAvg / valueM) * 100;

      varK = (valueP * valueN) / 100;
      varPK = (valueK / parseInt(valueN)) * 100;
    } else {
      if (valueK) required("N (Poblacion)", "warning");
      varK = 0;
      varPK = 0;
    }

    if (variable) {
      switch (variable) {
        case "p":
          valueQ = varQ;
          valueK = varK;
          break;

        case "q":
          valueP = varP;
          valueK = varK;

          break;

        case "K":
          valueP = varPK;
          valueQ = 100 - valueP;
          break;

        case "avg":
          valueP = (valueAvg / valueM) * 100;
          valueQ = 100 - valueP;
          valueK = varK;
          break;
      }
    }
    if (variable !== "avg")
      valueAvg = hypergeometric
        ? hyperAverage(parseInt(valueN), parseInt(valueM), valueK)
        : average(parseInt(valueM), valueP);
    if (variable !== "dev")
      valueDeviation =
        showPoisson && poisson
          ? Math.pow((parseInt(valueM) * valueP) / 100, 1 / 2).toFixed(4)
          : valueN
          ? hypergeometric
            ? standarDeviation(parseInt(valueN), parseInt(valueM), valueK)
            : deviation(
                parseFloat(
                  correctionFactor(parseInt(valueN), parseInt(valueM))
                ),
                parseInt(valueM),
                valueP
              )
          : Math.pow(valueM * (valueP / 100) * (1 - valueP / 100), 1 / 2);
    if (variable !== "kurt") valueKurtosis = kurtosis(parseInt(valueM), valueP);
    if (variable !== "skew") valueSkew = skew(parseInt(valueM), valueP);
    if (variable !== "FC")
      valueFC = parseFloat(
        correctionFactor(parseInt(valueN), parseInt(valueM))
      ).toString();
  }

  $: if (valueCF && valueN) {
    valueP = (valueCF / valueN) * 100;
    valueQ = 100 - valueP;
    valueK = (valueP * valueN) / 100;
  }

  $: {
    if (
      valueN > valueM &&
      valueN &&
      valueM >= (parseInt(valueN) * 0.2).toFixed(7)
    ) {
      hypergeometric = true;
    } else {
      hypergeometric = false;
    }
    valueAvg < 10 || parseFloat(valueP) < 10
      ? (poisson = true)
      : (poisson = false);
  }

  $: {
    valueSkew < 0
      ? (typeSkew = "Sesgo Negativo")
      : valueSkew == 0
      ? (typeSkew = "Sesgo Neutro Medio")
      : (typeSkew = "Sesgo Positivo");

    valueKurtosis < 0
      ? (typeKurt = "Platicurtica")
      : valueKurtosis == 0
      ? (typeKurt = "Mesocurtica")
      : (typeKurt = "Leptocurtica");
  }

  $: if (
    parseFloat(valueTol) > 100 ||
    parseFloat(valueP) > 100 ||
    parseFloat(valueQ) > 100
  )
    bigger0();

  $: if (
    parseFloat(valueP) < 0 ||
    parseFloat(valueQ) < 0 ||
    parseFloat(valueTol) < 0 ||
    parseInt(valueK) < 0
  )
    less0();
</script>

<div class="divider">Datos</div>
<div class="flex justify-center w-full">
  <div class="lg:columns-3 md:columns-1 sm:mx-10">
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
      placeholder="Casos Favorables"
      name="No. Casos Favorables"
      variable="cf"
      bind:valueVariable={valueCF}
      on:change={(e) => handleChange(e, "cf")}
    />
  </div>
</div>
<div class="flex justify-center w-full">
  <div
    class={`${
      valueP || valueQ || valueK ? "lg:columns-2" : "lg:columns-1"
    } md:columns-1 sm:mx-10`}
  >
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
    <div>
      {#if valueP || valueQ || valueK}
        <InputForm
          placeholder="Tolerancia"
          name="% tolerancia"
          variable="% tol"
          bind:valueVariable={valueTol}
        />
      {/if}
    </div>
  </div>
</div>
<div class="flex justify-center w-full">
  <div
    class="${valueN
      ? 'md:columns-3'
      : 'md:columns-2'} flex sm:columns-1 sm:mx-10"
  >
    <InputForm
      placeholder="Individuos"
      bind:valueVariable={valueK}
      name="n° individuos"
      variable="K"
      on:change={(e) => handleChange(e, "K")}
    />
    <InputForm
      placeholder="Probabilidad fracaso"
      bind:valueVariable={valueP}
      name="% exito"
      variable="p"
      on:change={(e) => handleChange(e, "p")}
    />
    <InputForm
      placeholder="Probabilidad fracaso"
      name="% fracaso"
      variable="q"
      bind:valueVariable={valueQ}
      on:change={(e) => handleChange(e, "q")}
    />
  </div>
</div>
<div class="divider">Resultados</div>
{#if poisson}
  <span class="flex justify-center">
    <span class="px-3 text-sm font-extrabold">
      {#if hypergeometric}
        Distribución Hipergeométrica
      {:else}
        Distribución Binomial
      {/if}
    </span>
    <Toggle bind:status={showPoisson} on:change={(e) => handleChange(e, "")} />
    <span class="px-3 text-sm font-extrabold"> Poisson</span>
  </span>
{/if}

<div class="flex justify-center w-full">
  <div class="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2">
    <InputForm
      placeholder="Media"
      name="Media"
      variable="λ"
      bind:valueVariable={valueAvg}
      on:change={(e) => handleChange(e, "avg")}
    />
    <InputForm
      placeholder="Desviacion"
      name="Desviacion"
      variable="Dev"
      bind:valueVariable={valueDeviation}
    />
    <InputForm
      placeholder="Curtosis"
      name="Curtosis"
      variable="Kurt"
      bind:valueVariable={valueKurtosis}
    />
    <InputForm
      placeholder="Sesgo"
      name="Sesgo"
      variable="Skew"
      bind:valueVariable={valueSkew}
    />
    <InputForm
      placeholder="Factor de Correccion"
      name="Factor de Correccion"
      variable="FC"
      bind:valueVariable={valueFC}
    />
  </div>
</div>
<div>
  {#if valueX && valueX >= 0}
    <div class="stats shadow flex">
      <div class="flex-col w-full">
        <div class="px-5 pt-2">
          <Toggle
            bind:status={showBothProbability}
            tooltip="Mostrar Todos los Resultados"
          />
        </div>
        {#if hypergeometric || showBothProbability}
          <Stat
            statTitle="Probabilidad segun condiciones de exito (hipergeométrica)"
          >
            {#if selected !== "="}
              {@const resHypN = hypergeometricProbabilityN(
                parseInt(valueX0),
                parseInt(valueX),
                parseInt(valueN),
                parseInt(valueM),
                valueK
              )}

              {resHypN + " = " + (parseFloat(resHypN) * 100).toFixed(7) + "%"}
            {:else}
              {@const resHyp = hypergeometricProbability(
                parseInt(valueN),
                parseInt(valueM),
                valueK,
                parseInt(valueX)
              )}

              {resHyp + " = " + (parseFloat(resHyp) * 100).toFixed(7) + "%"}
            {/if}
          </Stat>
        {/if}
        {#if !hypergeometric || showBothProbability}
          <Stat statTitle="Probabilidad segun condiciones de exito (Binomial)">
            {#if selected !== "="}
              {@const resBinN = binomialProbabilityN(
                parseInt(valueX0),
                parseInt(valueX),
                parseInt(valueM),
                valueP
              )}

              {resBinN + " = " + (parseFloat(resBinN) * 100).toFixed(7) + "%"}
            {:else}
              {@const resBin = binomialProbability(
                parseInt(valueX),
                parseInt(valueM),
                valueP
              )}

              {resBin + " = " + (parseFloat(resBin) * 100).toFixed(7) + "%"}
            {/if}
          </Stat>
        {/if}
        {#if poisson || showBothProbability}
          <Stat statTitle="Probabilidad segun condiciones de exito (Poisson)">
            {#if selected !== "="}
              {@const resPoisN = poissonProbabilityN(
                parseInt(valueX0),
                parseInt(valueX),
                parseInt(valueM),
                valueP
              )}

              {resPoisN + " = " + (parseFloat(resPoisN) * 100).toFixed(7) + "%"}
            {:else}
              {@const resPois = poissonProbability(
                parseInt(valueX),
                parseInt(valueM),
                valueP
              )}

              {resPois + " = " + (parseFloat(resPois) * 100).toFixed(7) + "%"}
            {/if}
          </Stat>
        {/if}
      </div>
    </div>
  {/if}
</div>
<div class="flex flex-col py-5 items-center justify-center text-lg font-bold">
  <div class="flex flex-row">
    {#if !hypergeometric}
      {#if (!valueN || valueM <= (parseInt(valueN) * 0.05).toFixed(7)) && (valueP || valueQ || valueK)}
        <subtitle class="justify-center text-center">
          Distribucion Binomial con poblacion:
          <div class="text-primary space-x-4 font-bold mx-2">Infinita</div>
        </subtitle>
      {:else if valueN && valueM && (valueP || valueQ || valueK) && valueN >= valueM}
        <subtitle>
          Distribucion Binomial con poblacion:
          <div class="text-primary space-x-4 font-bold mx-2">Finita</div>
        </subtitle>
      {/if}
    {/if}
  </div>
  <div>
    {#if valueSkew}
      <subtitle>
        Sesgo de Tipo:
        <div class="text-primary space-x-4 font-bold mx-2">{typeSkew}</div>
      </subtitle>
    {/if}
  </div>
  <div>
    {#if valueKurtosis}
      <subtitle>
        Curtosis de Tipo:
        <div class="text-primary space-x-4 font-bold mx-2">{typeKurt}</div>
      </subtitle>
    {/if}
  </div>
  <div>
    {#await toleranceFind}
      <div>Cargando...</div>
    {:then tol}
      <div>
        Tolerancia (poisson): {valueTol} = x: {tol
          ? tol.length > 0
            ? tol[tol.length - 1].x
            : ""
          : ""}
      </div>
    {/await}
  </div>
  <div>
    {#await toleranceBinomialFind}
      <div>Cargando...</div>
    {:then tol}
      <div>
        Tolerancia (Binomial): {valueTol} = x: {tol
          ? tol.length > 0
            ? tol[tol.length - 1].x
            : ""
          : ""}
      </div>
    {/await}
  </div>
</div>
<div class="divider">Graficos Probabilidad</div>
<div>
  <BinomialChart
    options={optionsCharts(
      valueM,
      valueP,
      "Probabilidades",
      true,
      "line",
      valueN
    )}
  />
</div>
<div class="divider">Graficos Probabilidad Acumulada</div>
<div>
  <BinomialChart
    options={optionsCharts(
      valueM,
      valueP,
      "Probabilidades",
      true,
      "bar",
      valueN
    )}
  />
</div>
<div class="divider">Tablas de Probabilidad (poisson)</div>
<div>
  <ProbabilityTable
    vector={dataPoissonTable(parseInt(valueM), valueP)}
    bind:tolerance={valueTol}
    bind:valueTolerance={toleranceFind}
  />
</div>

<div class="divider">
  Tablas de Probabilidades
  {#if hypergeometric}
    (Distribución Hipergeométrica)
  {:else}
    (Distribución Binomial)
  {/if}
</div>
<div>
  {#if hypergeometric}
    <ProbabilityTable
      vector={dataPoissonTable(parseInt(valueM), valueP)}
      bind:tolerance={valueTol}
      bind:valueTolerance={toleranceFind}
    />
  {:else}
    <ProbabilityTable
      vector={dataProbabilityTable(parseInt(valueM), valueP)}
      bind:tolerance={valueTol}
      bind:valueTolerance={toleranceBinomialFind}
    />
  {/if}
</div>
