export default function parsePrices(price = '') {
  const result = [];
  let buffer = [];
  const charCode = [32, 160];
  // eslint-disable-next-line no-restricted-syntax
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
