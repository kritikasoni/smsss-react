import React, { Component } from 'react';
import axios from 'axios';
import { BackendUrl } from 'Config';
export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient:{},
      medicine:0,
      medicineList:[],
      dosage: 0,
      dosageList:[],
      timeToTake:0,
      timeToTakeList:[],
      remark:'',
    }
    ;
    this._onSubmit = this._onSubmit.bind(this);
  }
  _onSubmit(e) {
    e.preventDefault();
    console.log('submit');
    axios
      .put(`${BackendUrl}/prescriptions/`+this.props.params.id,{
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
      .get('http://localhost:1337/prescriptions/' + this.props.params.id)
      .then(response => {
        this.setState({
          patient: response.data.patient,
          detail: response.data.detail,

        });
      });
  }
  render() {
    let medicineOptions = this.state.medicineList.map((medicine) => ({ label: medicine.name, value: medicine.id }));
    let dosageOptions = this.state.dosageList.map((dosage) => ({ label: dosage.name, value: dosage.id }));
    let timeToTakeOptions = this.state.timeToTakeList.map((timeToTake) => ({ label: timeToTake.name, value: timeToTake.id }));
    return (
      <form role="form" onSubmit={this._onSubmit}>
        Patient:
        <input
          name="patient"
          value={this.state.patient.firstName}
          onChange={(e) => this.setState({patient: {firstName: e.target.value }})}
          disabled
        />
        <br />
        Medicine:
        <Select
          name="medicine"
          options={medicineOptions}
          value = {this.state.medicine}
          onChange={(id) => this.setState({medicine: id })}
        />
        <br />
        Dosage:
        <Select
          name="dosage"
          options={dosageOptions}
          value = {this.state.dosage}
          onChange={(id) => this.setState({dosage: id })}
        />
        <br />
        Time to take:
        <Select
          name="timeToTake"
          options={timeToTakeOptions}
          value = {this.state.timeToTake}
          onChange={(id) => this.setState({timeToTake: id })}
        />
        <br />
        Remark:
        <textarea
          name="remark"
          type="text"
          value={this.state.remark}
          onChange={(e) => this.setState({remark: e.target.value})}
        />
        <br />

        <button type="submit" >Submit</button>
      </form>
    );
  }
}


