import React, { Component, PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
const Nurse = (props) => (
  <tr>
    <td>{props.firstName}</td>
    <td>{props.lastName}</td>
    <td>{props.department}</td>
    <td>{props.position}</td>
    <td>
      <Button  onClick={props.handleOnView}>View</Button>
      <Button bsStyle="primary" onClick={props.handleOnEdit}>Edit</Button>
      <Button bsStyle="danger" onClick={props.handleOnDelete}>Delete</Button>
    </td>
  </tr>);

Nurse.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  department: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  handleOnEdit: PropTypes.func.isRequired,
  handleOnView: PropTypes.func.isRequired,
  handleOnDelete: PropTypes.func.isRequired
}
export default Nurse;
