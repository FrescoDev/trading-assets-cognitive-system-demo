const url = require('url');
const R = require('ramda');
const cognitiveProcesses = require('../cognitive-processes');

const payloadIsInvalid = R.isNil;

const getCognitiveProcess = R.compose(
  name => R.find(R.propEq('name', name))(cognitiveProcesses),
  R.path(['query', 'capability']),
);

const handleFactObservation = async (req, res) => {
  try {
    return await R.ifElse(
      payloadIsInvalid,
      interaction => res.status(400).json({ error: 'Empty body is not allowed' }),
      async interaction => {
        req.log.info({ interaction, query: req.query });

        const cognitiveProcess = getCognitiveProcess(req);
        const result = await cognitiveProcess.execute(interaction);

        res.redirect(url.format({
          pathname: "/knowledge",
          query: {
            representation: JSON.stringify(result),
          }
        }));

        res.log.info({ result });
      }
    )(req.body)
  } catch (error) {
    req.log.error(error);
    res.status(500).json({ response: 'Failed to process interaction :(' });
  }
}

module.exports = handleFactObservation;