const React = require('react'); // eslint-disable-line no-unused-vars
const {
  renderToStaticMarkup,
} = require('react-dom/server');
const R = require('ramda');
const renderFullPage = require('./utils/render-full-page');
const cognitiveProcesses = require('../cognitive-processes');

module.exports = async (req, res, next) => {
  try {
    const PredictiveSearchBox = require('./interface/PredictiveSearchBoxComponent'); // eslint-disable-line no-unused-vars

    const body = renderToStaticMarkup(
      <div>
        <PredictiveSearchBox
          cognitiveProcessSelection={cognitiveProcesses}
        />
      </div>
    );

    return res.send(renderFullPage(body, null));
  } catch (e) {
    req.log.error(e);
    res.status(500).json({ response: 'Error : (' });
  }
};
