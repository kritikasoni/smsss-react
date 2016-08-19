import React, { Component, PropTypes } from 'react';
import Http from 'helper/Http';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { BackendUrl } from 'Config';

export class SelectMedicine extends Component {
  constructor(props, context) {
    super(props, context);
    this._getMedicineOptions = this._getMedicineOptions.bind(this);
  }

  _getMedicineOptions(input, callback) {
    const toOptionFormat = (medicine) => ({
      label: `${medicine.scientificName} ${medicine.informalName}`,
      value: medicine.id
    });
    if(input) {
      Http
        .get(`${BackendUrl}/medicines/search?scientificName=${input}&informalName=${input}`)
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
        .get(`${BackendUrl}/medicines`)
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
        loadOptions={this._getMedicineOptions}
        placeholder="Select medicine"
      />
    )
  }
}

SelectMedicine.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any
}

export default SelectMedicine;



