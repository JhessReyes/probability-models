<script lang="ts">
  import { number } from "echarts";

  interface tableValues {
    x: number;
    pX: string;
    pXA: string;
  }
  const defTableValues: tableValues = {
    x: 0,
    pX: "0",
    pXA: "0",
  };
  export let vector: Array<tableValues> = [];
  export let tolerance: any;
  export let valueTolerance: any = "";

  $: vector ? vector : defTableValues;
  $: if (vector && tolerance) {
    valueTolerance = vector.filter((element) => {
      return (
        parseFloat((parseFloat(element.pXA) * 100).toFixed(2)) <= tolerance
      );
    });
  }
</script>

<div class="overflow-x-auto">
  <div class="py-2 inline-block w-full sm:px-6 lg:px-8">
    <div class="table-wrp block max-h-96">
      <table class="table table-compact w-full">
        <thead class="sticky top-0">
          <tr>
            <th>X</th>
            <th>P(X)</th>
            <th>P(X) A</th>
            <th>% P(X)</th>
            <th>% P(X) A</th>
          </tr>
        </thead>

        <tbody class="h-72 overflow-y-auto overflow-x-auto">
          {#each vector as x}
            <tr
              class={valueTolerance
                ? valueTolerance[valueTolerance.length - 1].pXA == x.pXA
                  ? "active"
                  : ""
                : ""}
            >
              <th>{x.x}</th>
              <td>{x.pX}</td>
              <td>{x.pXA}</td>
              <td>{(parseFloat(x.pX) * 100).toFixed(2)}</td>
              <td>{(parseFloat(x.pXA) * 100).toFixed(2)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
