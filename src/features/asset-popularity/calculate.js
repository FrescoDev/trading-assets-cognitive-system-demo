const {
  name,
  axiomatic_principle
} = require('./metadata');
const moment = require('moment');
const R = require('ramda');
const googleTrends = require('google-trends-api');

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
    start_position: R.always('a year ago'),
    start_date: R.always(moment().add(-1, 'year')),
    end_position: R.always('current'),
    end_date: R.always(moment()),
    raw_numeric_value: R.identity,
    normailised_numeric_value: R.divide(R.__, 100),
    score: gain => `${gain} % gain`,
    natural_language_form: transformToNaturalLanguageRepresentation({ asset_id, temporal_context: 'evolutionary' }),
  }),
  ({ valueAtStart, valueAtEnd }) => R.subtract(valueAtEnd, valueAtStart),
  R.applySpec({
    valueAtStart: R.compose(
      R.mean,
      R.prop('value'),
      R.head
    ),
    valueAtEnd: R.compose(
      R.mean,
      R.prop('value'),
      R.last
    ),
  }),
);

const getCurrentResultContext = asset_id => R.compose(
  R.applySpec({
    type: R.always('static'),
    start_position: R.always('current'),
    start_date: R.always(moment()),
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
  R.mean,
  R.prop('value'),
  R.last
);

module.exports = async ({ asset_id }) => {
  const response = JSON.parse(
    await googleTrends.interestOverTime({
      keyword: `${asset_id}`,
      startTime: new Date(moment().add(-1, 'year'))
    })
  );

  return R.compose(
    R.applySpec({
      title: R.always(`${asset_id} Popularity Breakdown`),
      rationale: R.always(`This is calculated on the basis that ${axiomatic_principle}.`),
      temporal_context: R.applySpec({
        past: getHistoricResultContext(asset_id),
        present: getCurrentResultContext(asset_id)
      })
    }),
    R.path(['default', 'timelineData'])
  )(response);
};
