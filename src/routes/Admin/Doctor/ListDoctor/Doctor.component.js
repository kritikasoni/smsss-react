import React from 'react';

export const Doctor = (props) =>  (
  <div>
    <h1>{props.firstName}</h1>
    <h2>{props.lastName}</h2>
    <h3>{props.department.name}</h3>
  </div>
)
Doctor.propTypes = {
  firstName: React.PropTypes.string.isRequired,
  lastName: React.PropTypes.string.isRequired,
  department: React.PropTypes.object
}

export default Doctor;
