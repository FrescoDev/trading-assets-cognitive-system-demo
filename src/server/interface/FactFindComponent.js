const React = require('react'); // eslint-disable-line no-unused-vars
const R = require('ramda');

const renderDeterminants = R.map(
  factFindDeterminant => (
    <div className="form-group">
      {factFindDeterminant.interface_question}
      {factFindDeterminant.type !== 'select' ?
        <input
          className="form-control"
          key={factFindDeterminant.id}
          type={factFindDeterminant.type}
          name={factFindDeterminant.id}
          min={factFindDeterminant.min}
          max={factFindDeterminant.max}
          step={factFindDeterminant.step}
          required="true"
        /> :
        <select name={factFindDeterminant.id} className="form-control" id={factFindDeterminant.id} required="true">
          {factFindDeterminant.options.map(option => <option id={option.id} value={option.id}>{option.name}</option>)}
        </select>
      }
      <br />
    </div>
  )
);

const FactFindDeterminantWrapperComponent = ({ factFindDeterminants, title }) => factFindDeterminants && (
  <div className="container form-group" style={{ width: '50%' }}>
    <h3 style={{ padding: '5%' }}>{title}</h3>
    <form action={`api/facts?capability=${title}`} method="post">
      {renderDeterminants(factFindDeterminants)}
      <br />
      <input className="btn btn-primary" type="submit" value="Submit" />
    </form>
  </div>
);

module.exports = FactFindDeterminantWrapperComponent;