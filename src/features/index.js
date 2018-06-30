const asset_popularity = require('./asset-popularity');
const asset_statistical_support = require('./asset-statistical-support');
const asset_intrinsic_value = require('./asset-intrinsic-value');
const asset_speculative_value = require('./asset-speculative-value');

module.exports = [
  asset_popularity,
  asset_statistical_support,
  asset_intrinsic_value,
  asset_speculative_value,
];