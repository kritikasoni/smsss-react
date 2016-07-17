import React, { Component } from 'react';
import axios from 'axios'; //library เอาไว้ส่งข้อมูล
import { BackendUrl } from 'Config';
export default class AddNurse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient:{},
      time: new time,//ถูกไหม???
      room:0,
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

  render() {
    return (
      <form role="form" onSubmit={this._onSubmit}>

        Patient:
        <input
          type="text"
          name="patient"
          value={this.state.patient.firstName}
          onChange={(e) => this.setState({patient: e.target.value})}
        />
        <br />
        Time:
        <input //ให้ออโต้ไหม
          type="datetime"
          name="time"
          value={this.state.time}
          onChange={(e) => this.setState({time: e.target.value})}
        />
        <br />

        Room://ต้องออโต้ให้หรือว่าให้เลือกห้อง
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

