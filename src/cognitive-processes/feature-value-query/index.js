const assets = require('../../data-store/asset-symbols.json');
const features = require('../../features');
const R = require('ramda');

const feature_collection = R.compose(
  R.map(R.pick(['name', 'id']))
)(features);

const assets_collection = R.compose(
  R.slice(100, 500),
  R.map(asset => ({
    name: asset.Name,
    id: asset.Symbol
  }))
)(assets);

module.exports = {
  id: 'feature-value-query',
  name: 'Calculate',
  description: 'Execute cognitive calculations to work out vague asset properties e.g. how hot is tesla right now?',
  determinants: [{
    source: 'interface',
    id: 'feature_id',
    interface_question: '* Pick an asset property',
    type: 'select',
    options: feature_collection
  }, {
    source: 'interface',
    id: 'asset_id',
    interface_question: '* What is the asset called? e.g. TSLA',
    type: 'select',
    options: assets_collection
  }],
  execute: async ({ feature_id, asset_id }) => {
    const feature = require(`../../features/${feature_id}`);
    return await feature.calculate({ asset_id });
  }
};