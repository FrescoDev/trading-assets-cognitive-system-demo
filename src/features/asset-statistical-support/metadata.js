const R = require('ramda');

const name = 'statistical momentum';
const sources = ['live market data'];
const axiomatic_principle = `${name} is directly proportional to ${R.head(sources)}`;

module.exports = {
  id: 'asset-statistical-support',
  name,
  name_tags: [name, 'simple moving average', 'stats', 'traditional indicators'],
  description: `The ${name} of a trading asset as in the amount of strength in price movements given certain statistical indicators`,
  sources,
  axiomatic_principle,
};
