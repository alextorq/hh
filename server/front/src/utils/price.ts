export function parsePrices(price: string = '') : Array<number> {
  const result = [];
  let buffer = [];
  const charCode = [32, 160];
  /* eslint no-restricted-syntax:0 */
  for (const item of price) {
    if (charCode.includes(item.charCodeAt(0)) || (!Number.isNaN(parseInt(item, 10)))) {
      buffer.push(item);
    } else {
      const withOutSpace = buffer.join('').replace(/\s+/g, '');
      const number = parseInt(withOutSpace, 10);
      if (number && typeof number === 'number') {
        result.push(number);
      }
      buffer = [];
    }
  }
  return result.sort((a, b) => a - b);
}


export function formatPrice(price: number) :string {
  return new Intl.NumberFormat('ru-RU').format(price);
}
