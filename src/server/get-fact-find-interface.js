const React = require('react'); // eslint-disable-line no-unused-vars
const {
  renderToStaticMarkup,
} = require('react-dom/server');
const R = require('ramda');
const renderFullPage = require('./utils/render-full-page');

module.exports = async (req, res, next) => {
  try {
    const FactFindDeterminantWrapperComponent = require('./interface/FactFindComponent'); // eslint-disable-line no-unused-vars

    const determinants = JSON.parse(req.query.determinants);
    const cognitiveProcess = JSON.parse(req.query.cognitiveProcess);

    const body = renderToStaticMarkup(
      <FactFindDeterminantWrapperComponent
        title={R.prop('name', cognitiveProcess)}
        factFindDeterminants={determinants}
      />
    );

    return res.send(renderFullPage(body, null));
  } catch (e) {
    req.log.error(e);
    return next();
  }
};