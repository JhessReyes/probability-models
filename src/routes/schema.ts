import { binomialProbability } from "./binomial-distribution";
import { hypergeometricProbability } from "./hypergeometric-distribution";
import { poissonProbability } from "./poisson-distribution";

//function to create a Multi graph
export function optionsCharts(
  n: number,
  p: number,
  title: string,
  acumulate: boolean,
  type: string = "bar",
  N: number = 0
) {
  let dataX: Array<number> = [];
  let dataBinomial: Array<any> = [];
  let dataHypergeometric: Array<any> = [];
  let dataPoisson: Array<any> = [];
  let options;
  let resAcBinomial: number = 0;
  let resAcHypergeometric: number = 0;
  let resAcPoisson: number = 0;
  let valK = (p * N) / 100;

  if (acumulate) {
    for (let i = 0; i <= n; i++) {
      resAcBinomial += parseFloat(binomialProbability(i, n, p));
      resAcHypergeometric += parseFloat(
        hypergeometricProbability(N, n, valK, i)
      );
      resAcPoisson += parseFloat(poissonProbability(i, n, p));
      dataBinomial.push(resAcBinomial);
      dataHypergeometric.push(resAcHypergeometric);
      dataPoisson.push(resAcPoisson);
      dataX.push(i);
    }
  } else {
    for (let i = 0; i <= n; i++) {
      let positionBinomial = parseFloat(binomialProbability(i, n, p));
      let positionHypergeometric = parseFloat(
        hypergeometricProbability(N, n, valK, i)
      );
      let positionPoisson = parseFloat(poissonProbability(i, n, p));
      dataBinomial.push(positionBinomial);
      dataHypergeometric.push(positionHypergeometric);
      dataPoisson.push(positionPoisson);
      dataX.push(i);
    }
  }

  options = {
    title: { text: title, left: 10 },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {
      data: ["Binomial", "Hipergeometrica", "Poisson"],
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: false,
        },
        saveAsImage: {
          pixelRatio: 2,
        },
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: 90,
      containLabel: true,
    },
    dataZoom: [
      {
        type: "inside",
      },
      {
        type: "slider",
      },
    ],
    xAxis: {
      type: "category",
      data: dataX,
      silent: false,
      splitLine: {
        show: false,
      },
      splitArea: {
        show: false,
      },
    },
    yAxis: {
      type: "value",
      splitArea: {
        show: false,
      },
    },
    series: [
      {
        name: "Binomial",
        type: type,
        smooth: true,
        data: dataBinomial,
        large: true,
      },
      {
        name: "Hipergeometrica",
        type: type,
        smooth: true,
        data: dataHypergeometric,
        large: true,
      },
      {
        name: "Poisson",
        type: type,
        smooth: true,
        data: dataPoisson,
        large: true,
      },
    ],
  };

  return options;
}
