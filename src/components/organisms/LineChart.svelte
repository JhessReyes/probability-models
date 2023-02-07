<script lang="ts">
  import { onMount } from "svelte";
  import * as echarts from "echarts";

  export let dataX: Array<[]>;
  export let dataY: Array<[]>;
  export let title: string;
  const setOption = {
    title: { text: title },
    tooltip: {},
    toolbox: {
      feature: {
        dataView: {},
        saveAsImage: {
          pixelRatio: 2,
        },
        restore: {},
      },
    },
    xAxis: { type: "category", data: dataX },
    yAxis: { type: "value" },
    series: [
      {
        type: "line",
        smooth: true,
        data: dataY,
      },
    ],
  };
  let element: any = null;
  let chart: any = null;

  onMount(async () => {
    chart = echarts.init(element, {
      width: "auto",
      renderer: "canvas",
    });
    chart.setOption(setOption);
  });
</script>

{#if title && dataX && dataY}
  <div class="w-full h-full" bind:this={element} />
{/if}
