import React, { Component, PropTypes } from 'react';
import Http from 'helper/Http';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { BackendUrl } from 'Config';

export class SelectNurse extends Component {
  constructor(props, context) {
    super(props, context);
    this._getNurseOptions = this._getNurseOptions.bind(this);
  }

  _getNurseOptions(input, callback) {
    const toOptionFormat = (nurse) => ({
      label: `${nurse.firstName} ${nurse.lastName}`,
      value: nurse.id
    });
    if(input) {
      Http
        .get(`${BackendUrl}/nurses/search/name/${input}`)
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
        .get(`${BackendUrl}/nurses`)
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
        loadOptions={this._getNurseOptions}
        placeholder="Search nurse"
      />
    )
  }
}

SelectNurse.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any
}

export default SelectNurse;



