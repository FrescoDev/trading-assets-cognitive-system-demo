const React = require('react'); // eslint-disable-line no-unused-vars
const R = require('ramda');

const renderSelectionOptions = R.map(
  cognitiveProcess => (
    <option
      name={cognitiveProcess.name}
      id={cognitiveProcess.id}
    >
      {cognitiveProcess.name}
    </option>
  )
);

const CognitiveProcessSelectionComponent = ({ cognitiveProcessSelection }) => (
  <div className="container form-group" style={{ width: '50%' }}>
    <h3 style={{ padding: '5%' }}>Select Capability</h3>
    <form action="api/selection" method="post">
      <div className="form-group">
        <select name="cognitive-capability-selection" className="form-control" id="capability-input">
          {renderSelectionOptions(cognitiveProcessSelection)}
        </select>
        <br />
      </div>
      <br />
      <input className="btn btn-primary" type="submit" value="Select" />
    </form>
  </div>
);

module.exports = CognitiveProcessSelectionComponent;
