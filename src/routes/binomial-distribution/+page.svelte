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
  import { getNotificationsContext } from "svelte-notifications";
  import Stat from "../../components/atoms/Stat.svelte";
  import {
    hyperAverage,
    hypergeometricProbability,
    hypergeometricProbabilityN,
    standarDeviation,
  } from "../hypergeometric-distribution";
  const { addNotification } = getNotificationsContext();

  const required = (variable: string) => {
    addNotification({
      text: "La variable: " + variable + " es requerida",
      position: "bottom-right",
      type: "error",
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
  let valueN: string;
  let valueM: string;
  let valueP: string;
  let valueQ: string;
  let valueK: string;
  let valueX: string;
  let valueX0: string;
  let selected = "=";
  let options = ["=", "<="];
  let hypergeometric: boolean = false;

  $: {
    if (
      valueN > valueM &&
      valueN &&
      valueM >= (parseInt(valueN) * 0.2).toFixed(7)
    ) {
      hypergeometric = true;
    } else hypergeometric = false;
  }

  /* $: {
    if (
      valueN > valueM &&
      valueN &&
      valueM >= (parseInt(valueN) * 0.2).toFixed(7)
    ) {
      goto(
        `/hypergeometric-distribution?valueN=${valueN}&valueM=${valueM}&valueP=${valueP}&valueQ=${valueQ}&valueK=${valueK}&valueX=${valueX}&valueX0=${valueX0}&selected=${selected}`
      );
    }
  } */
</script>

<section id="binomial-distribution">
  {#if hypergeometric}
    <title
      class="flex justify-center text-center text-[25px] sm:text-[50px] font-extrabold"
      >Distribución Hipergeométrica</title
    >
  {:else}
    <title
      class="flex justify-center text-center text-[25px] sm:text-[50px] font-extrabold"
      >Distribución Binomial</title
    >
  {/if}

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

      {#if !valueP && !valueQ && valueN && hypergeometric}
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
        {#if !valueN}
          {required("N (Poblacion)")}
        {/if}
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

      {#if parseInt(valueP) > 100 || parseInt(valueQ) > 100}
        {bigger0()}
      {/if}
      {#if parseInt(valueP) < 0 || parseInt(valueQ) < 0}
        {less0()}
      {/if}
    </div>
  </div>
  <div class="divider">Resultados</div>
  {#if !hypergeometric}
    {#if (!valueN || valueM <= (parseInt(valueN) * 0.05).toFixed(7)) && (valueP || valueQ || valueK)}
      <subtitle
        class="flex justify-center text-center text-[12px] sm:text-[25px]"
        >Distribucion Binomial con poblacion:
        <div class="text-primary space-x-4 font-bold mx-2">Infinita</div>
      </subtitle>
    {:else if valueN && valueM && (valueP || valueQ || valueK) && valueN >= valueM}
      <subtitle
        class="flex justify-center text-center text-[12px] sm:text-[25px] font-bold"
        >Distribucion Binomial con poblacion:
        <div class="text-primary space-x-4 font-bold mx-2">
          Finita
        </div></subtitle
      >
    {/if}
  {/if}
  {#if valueM && (valueP || valueQ || valueK)}
    {#if valueK && !valueN}
      {required("N (Poblacion)")}
    {/if}
    {@const valueRes =
      100 - parseFloat(valueQ) ||
      parseFloat(valueP) ||
      (parseFloat(valueK) / parseInt(valueN)) * 100}

    <div class="stats shadow flex">
      <Stat
        statTitle="Media"
        statValue={hypergeometric
          ? hyperAverage(parseInt(valueN), parseInt(valueM), parseFloat(valueK))
          : average(parseInt(valueM), valueRes)}
      />
      <Stat statTitle="Curtosis">
        <div class="flex flex-col">
          <div>
            {kurtosis(parseInt(valueM), valueRes)}
          </div>
          <span class="text-sm my-2">
            {parseFloat(kurtosis(parseInt(valueM), valueRes)) < 0
              ? "PLATICÚRTICA"
              : parseFloat(kurtosis(parseInt(valueM), valueRes)) == 0
              ? "MESOCÚRTICA"
              : "LEPTOCÚRTICA"}
          </span>
        </div>
      </Stat>
      <Stat statTitle="Sesgo">
        <div class="flex flex-col">
          <div>
            {skew(parseInt(valueM), valueRes)}
          </div>
          <span class="text-sm my-2">
            {parseFloat(skew(parseInt(valueM), valueRes)) < 0
              ? "SESGO NEGATIVO"
              : parseFloat(skew(parseInt(valueM), valueRes)) == 0
              ? "SESGO NEUTRO MEDIO"
              : "SESGO POSITIVO"}
          </span>
        </div>
      </Stat>
    </div>
  {/if}

  <!-- infinite contidions -->
  {#if (valueN >= valueM || valueP || valueQ || valueK) && parseInt(valueX) >= 0}
    {#if valueK && !valueN}
      {required("N (Poblacion)")}
    {/if}
    {@const valueRes =
      100 - parseFloat(valueQ) ||
      parseFloat(valueP) ||
      (parseFloat(valueK) / parseInt(valueN)) * 100}
    <div class="stats shadow flex">
      {#if hypergeometric}
        <Stat
          statTitle="Probabilidad segun condiciones de exito (hipergeométrica)"
        >
          {#if selected !== "="}
            {@const resHypN = hypergeometricProbabilityN(
              parseInt(valueX0),
              parseInt(valueX),
              parseInt(valueN),
              parseInt(valueM),
              parseFloat(valueK)
            )}

            {resHypN + " = " + (parseFloat(resHypN) * 100).toFixed(7) + "%"}
          {:else}
            {@const resHyp = hypergeometricProbability(
              parseInt(valueN),
              parseInt(valueM),
              parseFloat(valueK),
              parseInt(valueX)
            )}

            {resHyp + " = " + (parseFloat(resHyp) * 100).toFixed(7) + "%"}
          {/if}
        </Stat>
      {:else}
        <Stat statTitle="Probabilidad segun condiciones de exito">
          {#if selected !== "="}
            {@const resBinN = binomialProbabilityN(
              parseInt(valueX0),
              parseInt(valueX),
              parseInt(valueM),
              valueRes
            )}

            {resBinN + " = " + (parseFloat(resBinN) * 100).toFixed(7) + "%"}
          {:else}
            {@const resBin = binomialProbability(
              parseInt(valueX),
              parseInt(valueM),
              valueRes
            )}

            {resBin + " = " + (parseFloat(resBin) * 100).toFixed(7) + "%"}
          {/if}
        </Stat>
      {/if}
    </div>
  {/if}

  <!-- finite conditions -->
  {#if valueN && valueM && (valueP || valueQ || valueK) && valueN >= valueM}
    {#if valueK && !valueN}
      {required("N (Poblacion)")}
    {/if}
    {@const valueRes =
      100 - parseFloat(valueQ) ||
      parseFloat(valueP) ||
      (parseFloat(valueK) / parseInt(valueN)) * 100}
    <div class="stats shadow flex">
      <Stat
        statTitle="Factor de Corrección"
        statValue={parseFloat(
          correctionFactor(parseInt(valueN), parseInt(valueM))
        ).toString()}
      />
      <Stat
        statTitle="Desviación Estándar"
        statValue={hypergeometric
          ? standarDeviation(
              parseInt(valueN),
              parseInt(valueM),
              parseFloat(valueK)
            )
          : deviation(
              parseFloat(correctionFactor(parseInt(valueN), parseInt(valueM))),
              parseInt(valueM),
              valueRes
            )}
      />
    </div>
  {/if}
  {#if valueM && (valueP || valueQ || valueK)}
    {#if valueK && !valueN}
      {required("N (Poblacion)")}
    {/if}
    {@const valueRes =
      100 - parseFloat(valueQ) ||
      parseFloat(valueP) ||
      (parseFloat(valueK) / parseInt(valueN)) * 100}
    <div class="divider">Grafico</div>
    <BinomialChart
      options={optionsBinomialDistribution(
        parseInt(valueM),
        valueRes,
        "Distribucion Binomial"
      )}
    />
  {/if}
</section>
