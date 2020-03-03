export function average(nums: Array<number> = []): number {
  return Math.floor(nums.reduce((a: number, b: number) => (a + b)) / nums.length);
}

export function getModa(data:Array<object> = []): number {
  const res: object = {};
  for (const item: object of data) {
    if (!res[item]) { res[item] = 0; }
    res[item] = res[item] + 1;
  }

  let max = 0;
  let key = 0;

  for (const item in res) {
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

