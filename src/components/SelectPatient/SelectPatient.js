import React, { Component, PropTypes } from 'react';
import Http from 'helper/Http';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { BackendUrl } from 'Config';

export class SelectPatient extends Component {
  constructor(props, context) {
    super(props, context);
    this._getPatientOptions = this._getPatientOptions.bind(this);
  }
  dataSourceSearchUrl() {
    let dataSourceSearchUrl = `${BackendUrl}/patients/search/idCardNo/${input}`;

    if(this.props.dataSourceSearchUrl){
      dataSourceSearchUrl = `${this.props.dataSourceSearchUrl}/${input}`
    }
    return dataSourceSearchUrl;
  }
  dataSourceUrl() {
    let dataSourceUrl = `${BackendUrl}/patients`;
    if(this.props.dataSourceUrl){
      dataSourceUrl = this.props.dataSourceUrl;
    }
    return dataSourceUrl;
  }
  _getPatientOptions(input, callback) {
    const toOptionFormat = (patient) => ({
      label: `${patient.idCardNo} ${patient.firstName} ${patient.lastName}`,
      value: patient.id,
      data: patient
    });
    if(input){
      Http.get(this.dataSourceSearchUrl())
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

      Http.get(this.dataSourceUrl())
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
  render() {
    return (
      <Select.Async
        {...this.props}
        onChange={this.props.onChange}
        value={this.props.value}
        loadOptions={this._getPatientOptions}
        placeholder="Search patient.."
      />
    )
  }
}

SelectPatient.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
  dataSourceUrl: PropTypes.string,
  dataSourceSearchUrl: PropTypes.string
}

export default SelectPatient;



