import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadAppointment } from 'appointment.reducer';

export class ListAppointment extends Component {
  constructor(props,context) {
    super(props,context);
  }

  componentWillMount() {
    this.props.loadAppointment();
  }

  render() {
    let appointments = this.props.appointments.map((appointment) => {
      return (
        <div>
          <h2>{appointment.detail}</h2>
          <a href={`/doctor/appointments/${appointment.id}/edit`} ><button type="button">Edit</button></a>
          <button type="button" onClick={() => this._deleteAppointment(appointment.id)}>Delete</button>
        </div>
      );
    });
    return (
      <div>
        <h1>Appointments</h1>
        {appointments}
      </div>
    );
  }
}

ListAppointment.propTypes = {
  appointments: PropTypes.array.isRequired,
  loadAppointment: PropTypes.array
}

const mapStateToProps = (state) => ({
  appointments: state.appointments.appointments
})
const mapDispatchToProps = {
  loadAppointment
}
export default connect(mapStateToProps, mapDispatchToProps)(ListAppointment);
