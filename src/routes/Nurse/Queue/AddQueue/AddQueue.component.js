import React, { Component } from 'react';
import axios from 'axios';
import { BackendUrl } from 'Config';
import { todayDateInputValue } from 'helper/Utils';

export default class AddNurse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient:{},
      time: todayDateInputValue(),
      room:1,
      roomlist:[]

    };
    this._onSubmit = this._onSubmit.bind(this);
  }
  _onSubmit(e) {
    e.preventDefault();
    console.log('submit');
    axios
      .post(`${BackendUrl}/queues`,{ //ใช้เพื่อส่งข้อมูล
        patient: this.state.patient,
        time: this.state.time,
        room:this.state.room,
      })
      .then(response => {
        console.log(response);
        alert('success');
      })
      .catch(err => {
        console.error(err);
      })
  }
  componentWillMount() {
    axios
      .get(`${BackendUrl}/patients/`+this.props.params.id)
      .then(response => {
        this.setState({
          patient : response.data
        });
        console.log(this.state.patient);
      });
  }
  render() {
    return (
      <form role="form" onSubmit={this._onSubmit}>

        Patient:
        <input
          type="text"
          name="patient"
          value={this.state.patient.firstName}
          onChange={(e) => this.setState({patient: e.target.value})}
          disabled
        />
        <br />
        Time:
        <input
          type="datetime"
          name="time"
          value={this.state.time}
          onChange={(e) => this.setState({time: e.target.value})}
        />
        <br />
        Room:
        <input
          type="text"
          name="room"
          value={this.state.room}
          onChange={(e) => this.setState({room: e.target.value})}
        />
        <br />

        <button type="submit" >Submit</button>
      </form>
    );
  }
}

