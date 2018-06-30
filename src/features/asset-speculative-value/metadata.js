const R = require('ramda');

const name = 'speculative demand';
const sources = ['news', 'company filings', 'current events'];
const axiomatic_principle = `${name} is directly proportional to ${R.head(sources)}`;

module.exports = {
  id: 'asset-speculative-value',
  name,
  name_tags: [name],
  description: `The ${name} of a trading asset`,
  sources,
  axiomatic_principle,
};
