import React, { Component } from 'react';
import axios from 'axios'; //library เอาไว้ส่งข้อมูล
import { todayDateInputValue } from './../../../../helper/Utils';

export default class AddAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room:'',
      patient:{},
      doctor:'',
      date: todayDateInputValue() //ใส่เวลาวันที่ยังไง
    };
    this._onSubmit = this._onSubmit.bind(this);
  }
  componentWillMount() {
    axios
      .get('http://localhost:1337/patients/'+this.props.params.id)
      .then(response => {
        this.setState({
          patient : response.data
        });
        console.log(this.state.patient);
      });
  }
  _onSubmit(e) {
    e.preventDefault();
    console.log('submit');
    axios
      .post('http://localhost:1337/appointments',{
        detail: this.state.detail,
        patient: this.state.patient,

      })
      .then(response => {
        console.log(response);
        alert('success');
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {

    return (
      <form role="form" onSubmit={this._onSubmit}>
        Room:
        <input
          name="room"
          value={this.state.room}
          onChange={(e) => this.setState({room: e.target.value})}
        />
        <br />
        Patient:
        <input
          name="patient"
          value={this.state.patient.firstName}
          onChange={(e) => this.setState({patient: {firstName: e.target.value }})}
          disabled
        />
        <br />
        Doctor:
        <input
          name="doctor"
          value={this.state.doctor}
          onChange={(e) => this.setState({doctor: e.target.value})}
        />
        <br />
        Date:
        <input
          name="date"
          type="date"
          value={this.state.date}
          onChange={(e) => this.setState({date: e.target.value})}
        />
        <br />
        <button type="submit" >Submit</button>
      </form>
    );
  }
}

