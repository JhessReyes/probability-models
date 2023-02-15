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
  const { addNotification } = getNotificationsContext();

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
  let valueX: string;
  let valueX0: string;
  let selected = "=";
  let options = ["=", "<="];
</script>

<section id="binomial-distribution">
  <title
    class="flex justify-center text-center text-[25px] sm:text-[50px] font-extrabold"
    >Distribucion Binomial</title
  >
  <div class="divider">Datos</div>
  <div class="flex justify-center w-full">
    <div class="md:columns-5 sm:columns-1 sm:mx-10">
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
      {#if valueQ}
        {@const valueP = 100 - parseFloat(valueQ)}
        <InputForm
          disabled={true}
          valueVariable={valueP.toFixed(2).toString()}
          name="% exito"
          variable="p"
        />
      {/if}
      {#if !valueQ}
        <InputForm
          placeholder="Probabilidad exito"
          name="% exito"
          variable="p"
          bind:valueVariable={valueP}
        />
      {/if}

      {#if !valueP}
        <InputForm
          placeholder="Probabilidad fracaso"
          name="% fracaso"
          variable="q"
          bind:valueVariable={valueQ}
        />
      {/if}
      {#if parseInt(valueP) > 100 || parseInt(valueQ) > 100}
        {bigger0()}
      {/if}
      {#if parseInt(valueP) < 0 || parseInt(valueQ) < 0}
        {less0()}
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
  {#if (!valueN || valueM <= (parseInt(valueN) * 0.05).toFixed(7)) && valueP}
    <subtitle class="flex justify-center text-center text-[12px] sm:text-[25px]"
      >Distribucion Binomial con poblacion:
      <div class="text-primary space-x-4 font-bold mx-2">Infinita</div>
    </subtitle>
  {:else if valueN && valueM && valueP && valueN >= valueM}
    <subtitle
      class="flex justify-center text-center text-[12px] sm:text-[25px] font-bold"
      >Distribucion Binomial con poblacion:
      <div class="text-primary space-x-4 font-bold mx-2">Finita</div></subtitle
    >
  {/if}

  {#if valueM && (valueP || valueQ)}
    {@const valueRes =
      parseFloat(valueQ) > 0 ? 100 - parseFloat(valueQ) : parseFloat(valueP)}
    <div class="stats shadow flex">
      <Stat statTitle="Media" statValue={average(parseInt(valueM), valueRes)} />
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
  {#if (valueN >= valueM || valueP || valueQ) && parseInt(valueX) >= 0}
    {@const valueRes =
      parseFloat(valueQ) > 0 ? 100 - parseFloat(valueQ) : parseFloat(valueP)}
    <div class="stats shadow flex">
      <Stat statTitle="Probabilidad segun condiciones de exito">
        {#if selected !== "="}
          {binomialProbabilityN(
            parseInt(valueX0),
            parseInt(valueX),
            parseInt(valueM),
            valueRes
          ) +
            " = " +
            (
              parseFloat(
                binomialProbabilityN(
                  parseInt(valueX0),
                  parseInt(valueX),
                  parseInt(valueM),
                  valueRes
                )
              ) * 100
            ).toFixed(7) +
            "%"}
        {:else}
          {binomialProbability(parseInt(valueX), parseInt(valueM), valueRes) +
            " = " +
            (
              parseFloat(
                binomialProbability(
                  parseInt(valueX),
                  parseInt(valueM),
                  valueRes
                )
              ) * 100
            ).toFixed(7) +
            "%"}
        {/if}
      </Stat>
    </div>
  {/if}

  <!-- finite conditions -->
  {#if valueN && valueM && (valueP || valueQ) && valueN >= valueM}
    {@const valueRes =
      parseFloat(valueQ) > 0 ? 100 - parseFloat(valueQ) : parseFloat(valueP)}
    <div class="stats shadow flex">
      <Stat
        statTitle="Factor de Corrección"
        statValue={parseFloat(
          correctionFactor(parseInt(valueN), parseInt(valueM))
        ).toString()}
      />
      <Stat
        statTitle="Desviación"
        statValue={deviation(
          parseFloat(correctionFactor(parseInt(valueN), parseInt(valueM))),
          parseInt(valueM),
          valueRes
        )}
      />
    </div>
  {/if}
  {#if valueM && (valueP || valueQ)}
    {@const valueRes =
      parseFloat(valueQ) > 0 ? 100 - parseFloat(valueQ) : parseFloat(valueP)}
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
