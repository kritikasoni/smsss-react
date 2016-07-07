import React, { Component } from 'react';
import axios from 'axios';
import Patient from './Patient.component';
import { dateToString } from './../../../../helper/Utils';
export default class ListPatient extends Component {
  constructor(props,context) {
    super(props,context);
    this.state =  {
      patients: []
    };
    this._deletePatient = this._deletePatient.bind(this);
    this._editPatient = this._editPatient.bind(this);
  }

  componentWillMount() {
    axios
      .get('http://localhost:1337/patients')
      .then(response => {
        this.setState({
          patients : response.data
        });
      });
  }

  _deletePatient(id) {
    axios
      .delete('http://localhost:1337/patients/'+id)
      .then(response => {
        let patients = this.state.patients.filter(patient => patient.id != id);
        this.setState({patients});
      })
      .catch(error => console.log);
  }
  _editPatient(id) {
    this.context.router.push(`/patients/${id}`);
  }
  render() {
    let patients = this.state.patients.map((patient) => {
      return (
        <div>
          <Patient key={ patient.id } {...patient} />
          <a href={`/admin/patients/${patient.id}/edit`} ><button type="button">Edit</button></a>
          <button type="button" onClick={() => this._deletePatient(patient.id)}>Delete</button>
        </div>
      );
    });
    return (
      <div>
        <h1>Patients</h1>
        {patients}
      </div>
    );
  }


}


