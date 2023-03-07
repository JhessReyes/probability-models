import { factorial } from "../binomial-distribution";

export function poissonProbability(x: any, n: any, p?: any, avg?: any) {
  const e = 2.71828;
  /*  avg = avg || (n * p) / 100;
   */
  p = p / 100; /* || (avg / n) * 100; */

  let result = Math.pow(n * p, x) / (factorial(x) * Math.pow(e, n * p));

  return result.toFixed(7);
}

//function to calculate p(X=x) (n)
export function poissonProbabilityN(
  x0: any,
  x: any,
  n: any,
  p: any,
  avg?: any
) {
  let result: number = 0;
  for (let i = x0; i <= x; i++) {
    result += parseFloat(poissonProbability(i, n, p));
  }

  return result.toFixed(7);
}

//funton to return data probability table
export function dataPoissonTable(n: number, p: number, avg?: any) {
  interface tableValues {
    x: number;
    pX: string;
    pXA: string;
  }

  let vector: Array<tableValues> = [];
  for (let i = 0; i <= n; i++) {
    vector.push({
      x: i,
      pX: poissonProbability(i, n, p),
      pXA: poissonProbabilityN(0, i, n, p),
    });
  }

  return vector;
}

//function to create a graph
export function optionsPoissonDistribution(
  n: number,
  p: number,
  title: string,
  acumulate: boolean,
  toleranceX: any = "",
  type: string = "bar"
) {
  let dataX: Array<number> = [];
  let dataY: Array<any> = [];
  let options;
  let resultAcumulate: number = 0;
  if (acumulate) {
    for (let i = 0; i <= n; i++) {
      resultAcumulate += parseFloat(poissonProbability(i, n, p));
      dataY.push(resultAcumulate);
      dataX.push(i);
    }
  } else {
    for (let i = 0; i <= n; i++) {
      let position = parseFloat(poissonProbability(i, n, p));
      dataY.push(position);
      dataX.push(i);
    }
  }

  if (toleranceX !== -1) {
    dataY[toleranceX] = {
      value: dataY[toleranceX],
      itemStyle: {
        color: "#a90000",
      },
    };
  }
  options = {
    title: { text: title, left: 10 },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
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
      bottom: 90,
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
        type: type,
        smooth: true,
        data: dataY,
        large: true,
      },
    ],
  };

  return options;
}

export default {
  optionsPoissonDistribution,
  poissonProbability,
  poissonProbabilityN,
};
