import React, { Component, PropTypes } from 'react';
import Http from 'helper/Http';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { BackendUrl } from 'Config';

export class SelectDepartment extends Component {
  constructor(props, context) {
    super(props, context);
    this._getDepartmentOptions = this._getDepartmentOptions.bind(this);
  }

  _getDepartmentOptions(input, callback) {
    const toOptionFormat = (department) => ({
      label: department.name,
      value: department.id
    });
    Http
      .get(`${BackendUrl}/departments`)
      .then(({data}) => {
        if(input) {
          callback(null, {
            options: data.filter(dep => dep.name.includes(input)).map(dep => toOptionFormat(dep)),
            complete: false
          })
        }
        else {
          callback(null, {
            options: data.map(dep => toOptionFormat(dep)),
            complete: true
          })
        }
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    return (
      <Select.Async
        {...this.props}
        onChange={this.props.onChange}
        value={this.props.value}
        loadOptions={this._getDepartmentOptions}
        placeholder="Select department"
      />
    )
  }
}

SelectDepartment.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any
}

export default SelectDepartment;



