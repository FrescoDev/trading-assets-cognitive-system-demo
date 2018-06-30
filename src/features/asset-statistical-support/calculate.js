const request = require('request-promise');
const moment = require('moment');
const R = require('ramda');
const {
  name,
  axiomatic_principle
} = require('./metadata');

const transformToNaturalLanguageRepresentation = ({ asset_id, temporal_context }) => R.ifElse(
  R.equals('static'),
  R.always(R.compose(
    sentenced_formatted_value => `${asset_id} is currently ${sentenced_formatted_value} in terms of ${name}.`,
    R.nth(R.__, ['pretty dead', 'fairly quiet', 'somewhere in the middle', 'doing pretty well', 'hot hot hot', 'as big as you can get']),
    Math.floor,
    R.divide(R.__, 20),
  )),
  R.always(R.compose(
    value => `${asset_id} has shown a ${name} momentum of ${value} over the last year.`,
    Math.round,
    R.divide(R.__, 20),
  ))
)(temporal_context);

const getHistoricResultContext = asset_id => R.compose(
  R.applySpec({
    type: R.always('evolutionary'),
    start_position: R.always('about half a year ago'),
    start_date: R.always(moment().add(-200, 'day')),
    end_position: R.always('current'),
    end_date: R.always(moment()),
    raw_numeric_value: R.identity,
    normailised_numeric_value: R.divide(R.__, 100),
    score: gain => `${gain} % gain`,
    natural_language_form: transformToNaturalLanguageRepresentation({ asset_id, temporal_context: 'evolutionary' }),
  }),
  R.always(0)
);

const getCurrentResultContext = asset_id => R.compose(
  R.applySpec({
    type: R.always('evolutionary'),
    start_position: R.always('a month ago'),
    start_date: R.always(moment().add(-1, 'month')),
    end_position: R.always('current'),
    end_date: R.always(moment()),
    raw_numeric_value: R.identity,
    normailised_numeric_value: R.divide(R.__, 100),
    score: R.compose(
      score => `${score} out of 10`,
      Math.round,
      R.divide(R.__, 10),
    ),
    natural_language_form: transformToNaturalLanguageRepresentation({ asset_id, temporal_context: 'static' }),
  }),
  R.always(0),
);

const options = asset_id => ({
  uri: 'https://www.alphavantage.co/query',
  qs: {
    function: 'SMA',
    symbol: asset_id,
    interval: 'daily',
    time_period: '90',
    series_type: 'close',
    apikey: 'D05MEGXQ7S95FBSB'
  },
  json: true
});

module.exports = async ({ asset_id }) => {
  const response = await request(options(asset_id));

  return R.compose(
    R.applySpec({
      title: R.always(`${asset_id} TSI Breakdown`),
      rationale: R.always(`This is calculated on the basis that ${axiomatic_principle}.`),
      temporal_context: R.applySpec({
        past: getHistoricResultContext(asset_id),
        present: getCurrentResultContext(asset_id)
      })
    }),
    R.applySpec({
      sma_at_end: R.head,
      sma_at_start: R.nth(365)
    }),
    R.toPairs,
    R.prop('Technical Analysis: SMA'),
  )(response);
};
