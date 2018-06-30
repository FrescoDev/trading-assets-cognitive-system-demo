const assets = require('../../data-store/asset-symbols.json');
const features = require('../../features');
const R = require('ramda');

const assets_collection = R.compose(
  R.slice(100, 500),
  R.map(asset => ({
    name: asset.Name,
    id: asset.Symbol
  }))
)(assets);

module.exports = {
  id: 'asset-appeal-valuation',
  name: 'Asset Appeal Valuation',
  description: '',
  determinants: [{
    source: 'interface',
    id: 'asset_id',
    interface_question: '* What is the asset called? e.g. TSLA',
    type: 'select',
    options: assets_collection
  }],
  execute: async ({ asset_id }) => {
    // foreach feature, execute
    // then feature Value * feature Weight = appeal value 
    return {};
  }
};