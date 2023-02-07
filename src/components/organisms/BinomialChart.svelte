<script lang="ts">
  import { onMount } from "svelte";
  import * as echarts from "echarts";

  const setOption = {
    title: { text: "" },
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
    xAxis: { type: "category", data: [] },
    yAxis: { type: "value" },
    series: [
      {
        type: "line",
        smooth: true,
        data: [],
      },
    ],
  };

  let element: any = null;
  let chart: any = null;
  export let options: any = null;

  $: chart?.setOption(options);
  onMount(async () => {
    chart = echarts.init(element, {
      width: "auto",
      renderer: "canvas",
    });
    let defaultOption = (await options) || setOption;
    chart.setOption(defaultOption);
  });
</script>

<div
  class="w-[275px] h-[500px] p-4 sm:w-full sm:h-full sm:p-6 "
  bind:this={element}
/>
