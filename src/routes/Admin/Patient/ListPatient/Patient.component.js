import React from 'react';
import Card from 'components/Card';
export const Patient = (props) =>  {
  return (
    <Card
      cardStyle={`col-xs-12 col-sm-4 col-sm-offset-4`}
      title={`${props.firstName} ${props.lastName}`}
      buttonName={`View`}
      onButtonClick={()=> props.handleOnClick(props.patientId)}>
      ID card No: {props.idCardNo}
    </Card>
  )
};
Patient.propTypes = {
  patientId: React.PropTypes.number.isRequired,
  firstName: React.PropTypes.string.isRequired,
  lastName: React.PropTypes.string.isRequired,
  email: React.PropTypes.string.isRequired,
  idCardNo: React.PropTypes.string.isRequired,
  dob: React.PropTypes.any.isRequired,
  weight: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  phone: React.PropTypes.string.isRequired,
  handleOnClick: React.PropTypes.func.isRequired
}

export default Patient;

