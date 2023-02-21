import { factorial } from "../binomial-distribution";

//STANDARD DEVIATION
export function standarDeviation(N: number, n: number, K: number) {
  let result =
    Math.pow(((n * K) / N) * (1 - K / N), 1 / 2) *
    Math.pow((N - n) / (N - 1), 1 / 2);

  return result.toFixed(4);
}

//HYPER AVERAGE
export function hyperAverage(N: number, n: number, K: number) {
  let result = (n * K) / N;

  return result.toFixed(4);
}

//function to calculate p(X=x)
export function hypergeometricProbability(
  N: number,
  n: number,
  K: number,
  x: number
) {
  let result =
    (factorial(N - K) * factorial(K) * factorial(n) * factorial(N - n)) /
    (factorial(n - x) *
      factorial(N - K - n + x) *
      factorial(x) *
      factorial(K - x) *
      factorial(N));

  return result.toFixed(7);
}

//function to calculate p(X=x) (n)
export function hypergeometricProbabilityN(
  x0: number,
  x: number,
  N: number,
  n: number,
  K: number
) {
  let result: number = 0;
  for (let i = x0; i <= x; i++) {
    result += parseFloat(hypergeometricProbability(N, n, K, i));
  }

  return result.toFixed(7);
}

export default {
  standarDeviation,
  hyperAverage,
  hypergeometricProbability,
  hypergeometricProbabilityN,
};
