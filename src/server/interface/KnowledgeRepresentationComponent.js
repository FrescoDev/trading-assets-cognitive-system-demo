const React = require('react'); // eslint-disable-line no-unused-vars
const R = require('ramda');

const Result = R.compose(
  R.values,
  R.mapObjIndexed((value, key) => (
    <td>{value}</td>
  )),
  R.pick(['score'])
);

const KnowledgeRepresentationComponent = ({ knowledge }) => knowledge && (
  <div className="container form-group" style={{ width: '50%' }}>
    <h3 style={{ paddingTop: '5%', paddingBottom: '5%' }}>Outcome</h3>
    <div>
      <p>{R.prop('sentence_form', knowledge)}</p>
    </div>
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Result</th>
          </tr>
          <tr>
            {Result(knowledge)}
          </tr>
        </thead>
      </table>
    </div>
    <h3>Explanation</h3>
    <div>
      <p>{R.prop('rationale', knowledge)}</p>
    </div>
  </div>
);

module.exports = KnowledgeRepresentationComponent;
