const React = require('react'); // eslint-disable-line no-unused-vars
const R = require('ramda');

const renderSelectionOptions = R.map(
  cognitiveProcess => (
    <li name={cognitiveProcess.name} id={cognitiveProcess.id}><a>{cognitiveProcess.name}</a></li>
  )
);

const CognitiveProcessSelectionComponent = ({ cognitiveProcessSelection }) => (
  <div className="container form-group" style={{ width: '50%' }}>
    <h3 style={{ padding: '5%', textAlign: 'center' }}>Cogni</h3>
    <form action="api/selection" method="post" className="form-horizontal" role="form">
      <div className="form-group">
        <input type="text" class="autocomplete form-control" id="capability-input" data-toggle="dropdown" name="cognitive-capability-selection" />
        <ul class="dropdown-menu" style={{ position: 'inherit' }} role="menu">
          {renderSelectionOptions(cognitiveProcessSelection)}
        </ul>
        <br />
      </div>
      <br />
      <div style={{ padding: '5%', textAlign: 'center' }}>
        <input className="btn btn-primary" type="submit" value="Go" />
      </div>
    </form>
  </div>
);

module.exports = CognitiveProcessSelectionComponent;
