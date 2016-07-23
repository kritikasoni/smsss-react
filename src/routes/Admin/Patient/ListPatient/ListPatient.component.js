import React, { Component } from 'react';
import axios from 'axios';
import Patient from './Patient.component';
import { dateToString } from './../../../../helper/Utils';
import { BackendUrl } from 'Config';
import classes from './ListPatient.component.scss';

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
      .get(`${BackendUrl}/patients`)
      .then(response => {
        this.setState({
          patients : response.data
        });
      });
  }

  _deletePatient(id) {
    axios
      .delete(`${BackendUrl}/patients/`+id)
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
          <a href={`/admin/patients/${patient.id}/edit`} >
            <button type="button" className={`btn ${classes.editer3}`}>EDIT</button></a>
          <button type="button" className={`btn ${classes.deleter3}`} onClick={() => this._deletePatient(patient.id)}>DELETE</button>
        </div>
      );
    });
    return (
      <div>
        <div className={classes.namepage3}><h1>Patients</h1></div>
        {patients}
      </div>
    );
  }


}


