import React, { Component } from 'react';
import Http from 'helper/Http';
import { BackendUrl } from 'Config';
export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: {},
      time: null,
      room: 0,
      roomlist: []
    }
    ;
    this._onSubmit = this._onSubmit.bind(this);
  }
  _onSubmit(e) {
    e.preventDefault();
    console.log('submit');
    Http
      .put(`${BackendUrl}/queues/`+this.props.params.id,{
        patient: this.state.patient.id,
        detail: this.state.detail,
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      })
  }

  componentWillMount(){
    Http
      .get(`${BackendUrl}/queues/` + this.props.params.id)
      .then(response => {
        this.setState({
          patient: response.data.patient,
          detail: response.data.detail,

        });
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
