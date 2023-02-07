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
function factorial(num: number) {
  var factorial: number = 1;

  while (num >= 1) {
    factorial = factorial * num;
    num--;
  }

  return factorial;
}
export default {
  average,
  correctionFactor,
  deviation,
  kurtosis,
};
