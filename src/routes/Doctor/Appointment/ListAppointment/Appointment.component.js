import React from 'react';

export const Appointment = (props) =>  (
  <div>
    <h1>{props.room}</h1>
    <h2>{props.patient}</h2>
    <h3>{props.doctor.name}</h3>
    <h4>{props.date}</h4>
  </div>
)
Appointment.propTypes = {
  room: React.PropTypes.number.isRequired,
  patient: React.PropTypes.number.isRequired,
  doctor: React.PropTypes.number.isRequired,
  date: React.PropTypes.dateTime.isRequired,


}

export default Appointment;
