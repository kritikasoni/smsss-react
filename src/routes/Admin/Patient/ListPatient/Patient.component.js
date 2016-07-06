import React from 'react';

export const Patient = (props) =>  (
  <div>
    <h1>{props.firstName}</h1>
    <h2>{props.lastName}</h2>
    <h3>{props.email}</h3>
    <h3>{props.idCardNo}</h3>
    <h3>{props.dob}</h3>
    <h3>{props.weight}</h3>
    <h3>{props.height}</h3>
    <h3>{props.phone}</h3>
  </div>
)
Patient.propTypes = {
  firstName: React.PropTypes.string.isRequired,
  lastName: React.PropTypes.string.isRequired,
  email: React.PropTypes.string.isRequired,
  idCardNo: React.PropTypes.string.isRequired,
  dob: React.PropTypes.string.isRequired,
  weight: React.PropTypes.string.isRequired,
  height: React.PropTypes.string.isRequired,
  phone: React.PropTypes.string.isRequired
  
}

export default Patient;

