import React, { Component } from 'react';
import axios from 'axios';
import Appointment from './Appointment.component';

export default class ListAppointment extends Component {
  constructor(props,context) {
    super(props,context);
    this.state =  {
      appointments: []
    };
    this._deleteAppointment = this._deleteAppointment.bind(this);
    this._editAppointment = this._editAppointment.bind(this);
  }

  componentWillMount() {
    axios
      .get('http://localhost:1337/appointments/patient/' + this.props.params.id)
      .then(response => {
        this.setState({
          appointments : response.data
        });
        console.log(this.state.appointments);
      });
  }

  _deleteAppointment(id) {
    axios
      .delete('http://localhost:1337/appointments/'+id)
      .then(response => {
        let appointments = this.state.appointments.filter(appointment => appointment.id != id);
        this.setState({appointments});
      })
      .catch(error => console.log);
  }
  _editAppointment(id) {
    this.context.router.push(`/appointments/${id}`);
  }
  render() {
    let appointments = this.state.appointments.map((appointment) => { //map ทำเพื่อเอาtagไปใส่
      return (
        <div>
          <Appointment key={appointment.id } {...appointment} />
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

