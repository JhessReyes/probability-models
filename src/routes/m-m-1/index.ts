//Wq Calculate
export function Wq(TLL: number, TS: number) {
  let Wq = null;

  Wq = TLL / (TS * (TS - TLL));
  return Wq.toFixed(4);
}

//Ws Calculate
export function Ws(Wq: number, TS: number) {
  let Ws = null;

  Ws = Wq + 1 / TS;
  /*   Ws = parseFloat(Wq(TLL, TS)) + 1 / TS; */
  return Ws.toFixed(4);
}

//Lq Calculate
export function Lq(TLL: number, Wq: number) {
  let Lq = null;

  Lq = TLL * Wq;
  return Lq.toFixed(4);
}

//Ls Calculate
export function Ls(TLL: number, Ws: number) {
  let Ls = null;

  Ls = TLL * Ws;
  return Ls.toFixed(4);
}

//Probability busy
export function p(TLL: number, TS: number) {
  let p = null;

  p = TLL / TS;
  return p.toFixed(4);
}

//Probability (n)
export function Pn(TLL: number, TS: number, n: number) {
  let Pn = null;

  Pn = (1 - TLL / TS) * Math.pow(TLL / TS, n);
  return Pn.toFixed(8);
}

//Probability P(Wq>t)
export function PWqt(p: number, TS: number, t: number) {
  let P = null;

  P = p * Math.pow(Math.exp(1), -TS * (1 - p) * t);
  return P.toFixed(8);
}

//Probability P(Ws>t)
export function PWst(p: number, TS: number, t: number) {
  let P = null;

  P = Math.pow(Math.exp(1), -TS * (1 - p) * t);
  return P.toFixed(8);
}


//function to create a Multi graph M'M'1
export function optionsChartsMM1(
  n: number, // refer t (time)
  p: number,
  title: string,
  acumulate: boolean = false,
  type: string = "bar",
  TS: number = 0
) {
  let dataX: Array<number> = [];
  let dataWq: Array<any> = [];
  let dataWs: Array<any> = [];
  let options;
  let resAcBinomial: number = 0;
  let resAcHypergeometric: number = 0;


  if (acumulate) {
    /*     for (let i = 0; i <= n; i++) {
          resAcBinomial += parseFloat(binomialProbability(i, n, p));
          resAcHypergeometric += parseFloat(
            hypergeometricProbability(N, n, valK, i)
          );
          resAcPoisson += parseFloat(poissonProbability(i, n, p));
          dataWq.push(resAcBinomial);
          dataWs.push(resAcHypergeometric);
          dataPoisson.push(resAcPoisson);
          dataX.push(i);
        } */
  } else {
    for (let i = 0; i <= n; i++) {
      let positionWq = parseFloat(PWqt(p, TS, i));
      let positionWs = parseFloat(PWst(p, TS, i));

      dataWq.push(positionWq);
      dataWs.push(positionWs);
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
      data: ["Cola", "Sistema"],
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
        name: "Cola",
        type: type,
        smooth: true,
        data: dataWq,
        large: true,
      },
      {
        name: "Sistema",
        type: type,
        smooth: true,
        data: dataWs,
        large: true,
      }
    ],
  };

  return options;
}

export default {
  Wq,
  Ws,
  Lq,
  Ls,
  p,
  Pn,
  PWqt,
  PWst
};
