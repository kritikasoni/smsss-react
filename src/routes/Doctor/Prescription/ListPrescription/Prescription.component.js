import React from 'react';

export const Prescription = (props) =>  (
  <div>
    <h1>{props.medicine}</h1>
    <h2>{props.patient}</h2>
    <h3>{props.dosage}</h3>
    <h4>{props.timeToTake}</h4>
    <h5>{props.remark}</h5>
  </div>
)
Prescription.propTypes = {
  medicine: React.PropTypes.number.isRequired,
  patient: React.PropTypes.number.isRequired,
  dosage: React.PropTypes.number.isRequired,
  timeToTake: React.PropTypes.number.isRequired,
  remark: React.PropTypes.string.isRequired,
  
}

export default Prescription;
