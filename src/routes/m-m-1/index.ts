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
