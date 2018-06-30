const React = require('react'); // eslint-disable-line no-unused-vars
const {
  renderToStaticMarkup,
} = require('react-dom/server');
const R = require('ramda');
const renderFullPage = require('./utils/render-full-page');

module.exports = async (req, res, next) => {
  try {
    const KnowledgeRepresentationComponent = require('./interface/KnowledgeRepresentationComponent'); // eslint-disable-line no-unused-vars

    const knowledge = JSON.parse(req.query.representation);
    const body = renderToStaticMarkup(
      <KnowledgeRepresentationComponent
        knowledge={knowledge}
      />
    );

    return res.send(renderFullPage(body, null));
  } catch (e) {
    req.log.error(e);
    return next();
  }
};