import React from 'react';

export const Nurse = (props) =>  (
  <div>
    <h1>{props.firstName}</h1>
    <h2>{props.lastName}</h2>
    <h3>{props.department.name}</h3>
  </div>
)
Nurse.propTypes = {
  firstName: React.PropTypes.string.isRequired,
  lastName: React.PropTypes.string.isRequired,
  department: React.PropTypes.object
}

export default Nurse;
