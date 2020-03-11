export function average(nums: Array<number> = []): number {
  return Math.floor(nums.reduce((a: number, b: number) => (a + b), 0) / nums.length);
}

export function getModa(data:Array<number> = []): number {
  const res = {};
  for (const item of data) {
    // @ts-ignore
    if (!res[item]) { res[item] = 0; }
    // @ts-ignore
    res[item] = res[item] + 1;
  }

  let max: number = 0;
  let key: number = 0;

  for (const item in res) {
    // @ts-ignore
    if (res[item] > max) { max = res[item]; key = item; }
  }
  return key;
}


export function round(val: number, rad: number = 5000): number {
  return Math.round(val / rad) * rad;
}


export function getRange(prices: Array<number>): number {
  const max: number = Math.max(...prices);
  const min: number = Math.min(...prices);
  return max - min;
}

