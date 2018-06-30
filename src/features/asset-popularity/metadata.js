const R = require('ramda');

const name = 'popularity';
const sources = ['Google search trends'];
const axiomatic_principle = `${name} is directly proportional to ${R.head(sources)}`;

module.exports = {
  id: 'asset-popularity',
  name,
  name_tags: [name, 'heat', 'hot', 'well known'],
  description: `The ${name} of a trading asset`,
  sources,
  axiomatic_principle,
};
