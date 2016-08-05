import React, { Component, PropTypes } from 'react';
import Http from 'helper/Http';
import Patient from './Patient.component';
import { dateToString } from './../../../../helper/Utils';
import { BackendUrl } from 'Config';
import Card from 'components/Card';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import classes from './ListPatient.component.scss';

export default class ListPatient extends Component {
  constructor(props,context) {
    super(props,context);
    this.state =  {
      patients: [],
      selectedPatientId: undefined
    };
    this._deletePatient = this._deletePatient.bind(this);
    this._editPatient = this._editPatient.bind(this);
    this._onViewPatient = this._onViewPatient.bind(this);
    this._getPatientOptions = this._getPatientOptions.bind(this);
    this._onPatientChange = this._onPatientChange.bind(this);
  }

  static contextTypes = {
    router: PropTypes.object,
  };

  componentWillMount() {
    Http
      .get(`${BackendUrl}/patients`)
      .then(response => {
        this.setState({
          patients : response.data
        });
      });
  }

  _deletePatient(id) {
    Http
      .delete(`${BackendUrl}/patients/`+id)
      .then(response => {
        let patients = this.state.patients.filter(patient => patient.id != id);
        this.setState({patients});
      })
      .catch(error => console.log);
  }

  _editPatient(id) {
    this.context.router.push(`/admin/patients/${id}/edit`);
  }

  _getPatientOptions(input, callback) {
    const toOptionFormat = (patient) => ({
      label: `${patient.idCardNo} ${patient.firstName} ${patient.lastName}`,
      value: patient.id,
      data: patient
    });
    if(input){
      Http.get(`${BackendUrl}/patients/search/idCardNo/${input}`)
        .then(({data}) => {
          callback(null, {
            options: data.map(patient => toOptionFormat(patient)),
            complete: false
          })
        })
        .catch(err => {
          throw err;
        });
    }
    else{
      Http.get(`${BackendUrl}/patients`)
        .then(({data}) => {
          callback(null, {
            options: data.map(patient => toOptionFormat(patient)),
            complete: true
          })
        })
        .catch(err => {
          throw err;
        });
    }
  }
  _onPatientChange(e) {
    this.setState({selectedPatientId: e.value});
  }

  _onViewPatient(id){
    this.context.router.push(`/admin/patients/${id}/detail`);
  }
  render() {
    let patients = this.state.patients.map((patient,index) => {
      return (
        <Patient key={ index } {...patient} patientId={patient.id} handleOnClick={this._onViewPatient}/>
      );
    });
    return (
      <div>
        <div className={classes.namepage3}><h1>Patients</h1></div>
        <div className={'row'}>
          <Select.Async
            name="patient"
            className={`col-xs-12 col-md-4 col-md-offset-4`}
            loadOptions={this._getPatientOptions}
            onChange={this._onPatientChange}
            value={this.state.selectedPatientId}
          />
        </div>
        <div className={'row'}>
          {patients}
        </div>
      </div>
    );
  }


}

