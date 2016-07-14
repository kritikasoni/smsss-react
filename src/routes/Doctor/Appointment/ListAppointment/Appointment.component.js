import React from 'react';

export const Appointment = (props) =>  (
  <div>
    <h2>{props.detail}</h2>

  </div>
)
Appointment.propTypes = {
  room: React.PropTypes.number.isRequired,
  patient: React.PropTypes.number.isRequired,
  doctor: React.PropTypes.number.isRequired,
  date: React.PropTypes.dateTime.isRequired,


}

export default Appointment;
