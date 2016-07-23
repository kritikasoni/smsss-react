import React, { Component } from 'react';
import axios from 'axios'; //library เอาไว้ส่งข้อมูล
import { todayDateInputValue } from './../../../../helper/Utils';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { BackendUrl } from 'Config';
import classes from './AddAppointment.scss';

export default class AddAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room:0,
      roomList: [],
      patient:{},
      doctor:'',
      date: todayDateInputValue() //ใส่เวลาวันที่ยังไง
    };
    this._onSubmit = this._onSubmit.bind(this);
  }
  componentWillMount() {
    this._loadRoomList();
    this._loadPatient();
  }
  _loadPatient() {
    axios
      .get(`${BackendUrl}/patients/`+this.props.params.id)
      .then(response => {
        this.setState({
          patient : response.data
        });
        console.log(this.state.patient);
      })
      .catch((err) => console.error(err));
  }
  _loadRoomList() {
    axios
      .get(`${BackendUrl}/rooms`)
      .then(response => {
        this.setState({roomList:response.data });
      })
      .catch(err => {
        console.error(err);
      })
  }
  _onSubmit(e) {
    e.preventDefault();
    console.log('submit');
    axios
      .post(`${BackendUrl}/appointments`,{
        room: this.state.room,
        patient: this.state.patient.id,
        doctor: this.state.doctor,
        date: this.state.date,

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
    let roomOptions = this.state.roomList.map((room) => ({ label: room.name, value: room.id }));
    return (
      <form role="form" onSubmit={this._onSubmit}>

        <div className={classes.topic6}>
        <div className="row"> 
          <div className="col-md-12"> 
            <div className="col-md-6 text-right"> ROOM :</div>
            <div className="col-md-4">
        <Select
          name="room"
          options={roomOptions}
          value = {this.state.room}
          onChange={(id) => this.setState({room: id })}
        /></div>
            </div>
          </div>
        <br />


          <div className="row"> 
            <div className="col-md-12"> 
              <div className="col-md-6 text-right"> PATIENT :</div> 
              <input className="col-md-3"
          name="patient"
          value={this.state.patient.firstName}
          onChange={(e) => this.setState({patient: {firstName: e.target.value }})}
          disabled
        />
              </div>
            </div>
        <br />

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6 text-right"> DOCTOR :</div>
              <input className="col-md-3"
          name="doctor"
          value={this.state.doctor}
          onChange={(e) => this.setState({doctor: e.target.value})}
          disabled
        />
            </div>
            </div>
        <br />

          <div className="row">
            <div className="col-ma-12">
              <div className="col-md-6 text-right"> DATE :</div>
              <input className="col-md-3"
          name="date"
          type="date"
          value={this.state.date}
          onChange={(e) => this.setState({date: e.target.value})}
        />
              </div>
            </div>
        </div>

        <button type="submit" className={`btn ${classes.submitbut5}`}>SUBMIT</button>
      </form>
    );
  }
}

