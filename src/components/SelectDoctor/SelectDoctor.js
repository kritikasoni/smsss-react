import React, { Component, PropTypes } from 'react';
import Http from 'helper/Http';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { BackendUrl } from 'Config';

export class SelectDoctor extends Component {
  constructor(props, context) {
    super(props, context);
    this._getDoctorOptions = this._getDoctorOptions.bind(this);
  }

  _getDoctorOptions(input, callback) {
    const toOptionFormat = (doctor) => ({
      label: `${doctor.firstName} ${doctor.lastName}`,
      value: doctor.id
    });
    if(input) {
      Http
        .get(`${BackendUrl}/doctors/search/name/${input}`)
        .then(({data}) => {
          callback(null, {
            options: data.filter(p => p.name.includes(input)).map(p => toOptionFormat(p)),
            complete: false
          })
        })
        .catch(err => {
          throw err;
        });
    }
    else {
      Http
        .get(`${BackendUrl}/doctors`)
        .then(({data}) => {
          callback(null, {
            options: data.map(p => toOptionFormat(p)),
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
        loadOptions={this._getDoctorOptions}
        placeholder="Search doctor"
        cache={false}
      />
    )
  }
}

SelectDoctor.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any
}

export default SelectDoctor;



