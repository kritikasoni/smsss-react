import React, { Component } from 'react';
import axios from 'axios';
import { BackendUrl } from 'Config';
export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: '',
      patient: {},
      doctor: '',
      date: new Date
    }
    ;
    this._onSubmit = this._onSubmit.bind(this);
  }
  _onSubmit(e) {
    e.preventDefault();
    console.log('submit');
    axios
      .put(`${BackendUrl}/appointments/`+this.props.params.id,{
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

  componentWillMount() {
    axios
      .get(`${BackendUrl}/appointments/` + this.props.params.id)
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
          value={this.state.patient}
          onChange={(e) => this.setState({patient: e.target.value})}
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
          value={this.state.date}
          onChange={(e) => this.setState({date: e.target.value})}
        />
        <br />

        <button type="submit" >Submit</button>
      </form>
    );
  }
}


