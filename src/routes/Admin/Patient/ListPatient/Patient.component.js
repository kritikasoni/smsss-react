import React from 'react';

export const Patient = (props) =>  {
  return ( <div>
    <h1>{props.firstName}</h1>
    <h2>{props.lastName}</h2>

  </div>)
};
Patient.propTypes = {
  firstName: React.PropTypes.string.isRequired,
  lastName: React.PropTypes.string.isRequired,
  email: React.PropTypes.string.isRequired,
  idCardNo: React.PropTypes.string.isRequired,
  dob: React.PropTypes.any.isRequired,
  weight: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  phone: React.PropTypes.string.isRequired

}

export default Patient;

