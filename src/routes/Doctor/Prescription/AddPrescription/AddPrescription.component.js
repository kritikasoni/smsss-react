import React, { Component } from 'react';
import axios from 'axios'; //library เอาไว้ส่งข้อมูล
import { todayDateInputValue } from './../../../../helper/Utils';
import Select from 'react-select';
import { BackendUrl } from 'Config';
import 'react-select/dist/react-select.css';

export default class AddPrescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient:{},
      medicine:0,
      medicineList:[],
      dosage: 0,
      dosageList:[1,2,3,4,5,6,7,8,9],
      timeToTake:0,
      timeToTakeList:[
        'morning-before meal','morning-after meal','afternoon-before meal',
        'afternoon-after meal','evening-before meal','evening-after meal',
        'before sleep'
      ],
      remark:'',

    };
    this._onSubmit = this._onSubmit.bind(this);
  }
  componentWillMount() {
    this._loadPatient();
    this._loadMedicine()
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
  _loadMedicine() {
    axios
      .get(`${BackendUrl}/medicines`)
      .then(response => {
        this.setState({
          medicineList : response.data
        });
        console.log(this.state.medicineList);
      })
      .catch((err) => console.error(err));
  }
  _onSubmit(e) {
    e.preventDefault();
    console.log('submit');
    axios
      .post('http://localhost:1337/prescriptions',{
        patient: this.state.patient.id,
        medicine: this.state.medicine,
        dosage: this.state.dosage,
        timeToTake: this.state.timeToTake,
        remark: this.state.remark,
        doctor: 1

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
    let medicineOptions = this.state.medicineList.map((medicine) => ({ label: medicine.scientificName, value: medicine.id }));
    let dosageOptions = this.state.dosageList.map((dosage) => ({ label: dosage, value: dosage }));
    let timeToTakeOptions = this.state.timeToTakeList.map((timeToTake) => ({ label: timeToTake, value: timeToTake }));
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

