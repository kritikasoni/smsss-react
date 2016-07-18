import React, { Component } from 'react';
import axios from 'axios'; //library เอาไว้ส่งข้อมูล
import { todayDateInputValue } from './../../../../helper/Utils';
import { BackendUrl } from 'Config';
import MedicinePrescriptionInput from './MedicinePrescriptionInput.component';

export default class AddPrescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient:{},
      medicineList:[],
      dosageList:[1,2,3,4,5,6,7,8,9],
      timeToTakeList:[
        'morning-before meal','morning-after meal','afternoon-before meal',
        'afternoon-after meal','evening-before meal','evening-after meal',
        'before sleep'
      ],
      medicinePrescriptions: []
    };
    this._onSubmit = this._onSubmit.bind(this);
    this._onMedicinePrescriptionChange = this._onMedicinePrescriptionChange.bind(this);
  }
  componentWillMount() {
    this._loadPatient();
    this._loadMedicine()
  }
  _loadPatient() {
    axios
      .get(`${BackendUrl}/patients/${this.props.params.id}`)
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
      .post(`${BackendUrl}/prescriptions`,{
        patient: this.state.patient.id,
        remark: this.state.remark,
        doctor: 1
      })
      .then(response => {
        console.log(response);
        this._addChunkOfMedicinePrescription(response.data.id);
      })
      .catch(err => {
        console.error(err);
      })
  }

  _addChunkOfMedicinePrescription(prescriptionId) {
    //TODO : send chunk of medicinePrescription
    // axios
    //   .post(`${BackendUrl}/medicinePrescriptions`,{
    //     medicine: this.state.medicine,
    //     prescription: prescriptionId,
    //     dosage: this.state.dosage,
    //     timeToTake: this.state.timeToTake
    //   })
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
  }

  _onMedicinePrescriptionChange(index) {
    return (value) => {
      this.setState({
        medicinePrescriptions: this.state.medicinePrescriptions.map((mp, i) => {
          if (i == index)
            return Object.assign({}, mp, value);
          else
            return mp;
        })
      });
    }
  }

  _addMoreMedicinePrescriptionInput() {
    console.log('add more');
    this.setState({
      medicinePrescriptions: [ ...this.state.medicinePrescriptions, {
        medicine: 0,
        dosage: 0,
        timeToTake: 0,
        remark: ''
      }]
    });
  }

  render() {
    let medicineOptions = this.state.medicineList.map((medicine) => ({ label: medicine.scientificName, value: medicine.id }));
    let dosageOptions = this.state.dosageList.map((dosage) => ({ label: dosage, value: dosage }));
    let timeToTakeOptions = this.state.timeToTakeList.map((timeToTake) => ({ label: timeToTake, value: timeToTake }));
    let medicinePrescriptionList = this.state.medicinePrescriptions.map((mp,index) => {
      return (
        <MedicinePrescriptionInput
          key={index}
          medicineOptions={medicineOptions}
          dosageOptions={dosageOptions}
          timeToTakeOptions={timeToTakeOptions}
          medicine={this.state.medicinePrescriptions[index].medicine}
          dosage={this.state.medicinePrescriptions[index].dosage}
          timeToTake={this.state.medicinePrescriptions[index].timeToTake}
          remark={this.state.medicinePrescriptions[index].remark}
          onMedicineChange={this._onMedicinePrescriptionChange(index)}
          onDosageChange={this._onMedicinePrescriptionChange(index)}
          onTimeToTakeChange={this._onMedicinePrescriptionChange(index)}
          onRemarkChange={this._onMedicinePrescriptionChange(index)}
        />
      );
    });
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
        {medicinePrescriptionList}
        <br />
        <button type="button" onClick={() => this._addMoreMedicinePrescriptionInput()} >
          Add more medicine
        </button>
        <button type="submit" >Submit</button>
      </form>
    );
  }
}
