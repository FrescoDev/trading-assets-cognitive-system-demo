const {
  id,
  name,
  name_tags,
  description,
  sources,
  axiomatic_principle
} = require('./metadata');
const calculate = require('./calculate');

module.exports = {
  id,
  name,
  name_tags,
  description,
  sources,
  axiomatic_principle,
  calculate
};
