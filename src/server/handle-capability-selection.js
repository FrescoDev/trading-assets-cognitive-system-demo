const url = require('url');
const R = require('ramda');
const cognitiveProcesses = require('../cognitive-processes');

const payloadIsInvalid = R.isNil;

const inferCognitiveProcessFrom = R.compose(
  value => R.find(R.propEq('name', value))(cognitiveProcesses),
  R.head,
  R.values
);

const handleCapabilitySelection = async (req, res) => {
  try {
    return await R.ifElse(
      payloadIsInvalid,
      interaction => res.status(400).json({ error: 'Empty body is not allowed' }),
      async interaction => {
        req.log.info({ interaction });

        const cognitiveProcess = inferCognitiveProcessFrom(interaction);
        const determinants = R.prop('determinants', cognitiveProcess);

        res.redirect(url.format({
          pathname: "/facts",
          query: {
            cognitiveProcess: JSON.stringify(cognitiveProcess),
            determinants: JSON.stringify(determinants)
          }
        }));
      }
    )(req.body)
  } catch (error) {
    req.log.error(error);
    res.status(500).json({ response: 'Failed to process interaction :(' });
  }
}

module.exports = handleCapabilitySelection;