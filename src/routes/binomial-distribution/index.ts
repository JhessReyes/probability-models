import { number } from "echarts";

//AVERAGE
export function average(n: number, p: number) {
  //convert
  p = p / 100;

  return (n * p).toFixed(4);
}

//correction Factor
export function correctionFactor(N: number, n: number) {
  let FC;

  FC = Math.pow((N - n) / (N - 1), 1 / 2);
  return FC.toFixed(4);
}

//Deviation
export function deviation(FC: number, n: number, p: number) {
  let q: number = 1 - p / 100;
  p = p / 100;
  let dev: number = 0;

  dev = FC * Math.pow(n * p * q, 1 / 2);
  return dev.toFixed(4);
}

//kurtosis
export function kurtosis(n: number, p: number) {
  let q: number = 1 - p / 100;
  p = p / 100;
  let kurt: number = 0;

  kurt = (q - p) / Math.pow(n * p * q, 1 / 2);
  return kurt.toFixed(4);
}

//skew (Inclination)
export function skew(n: number, p: number) {
  let sk: number = 0;
  let q: number = 1 - p / 100;
  p = p / 100;

  sk = 3 + (1 - 6 * p * q) / Math.pow(n * p * q, 1 / 2);
  return sk.toFixed(4);
}

//function to calculate factorial
export function factorial(num: number) {
  var factorial: number = 1;

  while (num >= 1) {
    factorial = factorial * num;
    num--;
  }

  return factorial;
}

//function to calculate p(x=x)
export function binomialProbability(x: number, n: number, p: number) {
  p = p / 100;

  let result =
    (factorial(n) / (factorial(n - x) * factorial(x))) *
    Math.pow(p, x) *
    Math.pow(1 - p, n - x);
  return result.toFixed(7);
}

//function to calculate p(x=x) (n)
export function binomialProbabilityN(
  x0: number,
  x: number,
  n: number,
  p: number
) {
  let result: number = 0;
  for (let i = x0; i <= x; i++) {
    result += parseFloat(binomialProbability(i, n, p));
  }
  return result.toFixed(7);
}

//funton to return data probability table
export function dataProbabilityTable(n: number, p: number) {
  interface tableValues {
    x: number;
    pX: string;
    pXA: string;
  }

  let vector: Array<tableValues> = [];
  for (let i = 0; i <= n; i++) {
    vector.push({
      x: i,
      pX: binomialProbability(i, n, p),
      pXA: binomialProbabilityN(0, i, n, p),
    });
  }

  return vector;
}

//function to create a graph
export function optionsBinomialDistribution(
  n: number,
  p: number,
  title: string,
  acumulate: boolean,
  toleranceX: any = "",
  type: string = "bar"
) {
  let dataX: Array<number> = [];
  let dataY: Array<number> = [];
  let options;
  let resultAcumulate: number = 0;
  if (acumulate) {
    for (let i = 0; i <= n; i++) {
      resultAcumulate += parseFloat(binomialProbability(i, n, p));
      dataY.push(resultAcumulate);
      dataX.push(i);
    }
  } else {
    for (let i = 0; i <= n; i++) {
      let position = parseFloat(binomialProbability(i, n, p));
      dataY.push(position);
      dataX.push(i);
    }
  }

  options = {
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
    xAxis: { type: "category", data: dataX },
    yAxis: { type: "value" },
    series: [
      {
        type: type,
        smooth: true,
        data: dataY,
        markArea: {
          itemStyle: {
            color: "rgba(255, 173, 177, 0.5)",
          },
          data: [
            [
              {
                name: "% Tolerancia",
                xAxis: toleranceX,
              },
              {
                xAxis: toleranceX,
              },
            ],
          ],
        },
      },
    ],
  };

  return options;
}

export default {
  average,
  correctionFactor,
  deviation,
  kurtosis,
  skew,
  binomialProbability,
  optionsBinomialDistribution,
  binomialProbabilityN,
  factorial,
  dataProbabilityTable,
};
