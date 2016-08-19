import React, { Component, PropTypes } from 'react';
import Http from 'helper/Http';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { BackendUrl } from 'Config';

export class SelectPosition extends Component {
  constructor(props, context) {
    super(props, context);
    this._getPositionOptions = this._getPositionOptions.bind(this);
  }
  _getPositionOptions(input, callback) {
    const toOptionFormat = (position) => ({
      label: position.name,
      value: position.id
    });
    Http
      .get(`${BackendUrl}/positions`)
      .then(({data}) => {
        if(input) {
          callback(null, {
            options: data.filter(p => p.name.includes(input)).map(p => toOptionFormat(p)),
            complete: false
          })
        }
        else {
          callback(null, {
            options: data.map(p => toOptionFormat(p)),
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
        loadOptions={this._getPositionOptions}
      />
    )
  }
}

SelectPosition.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any
}

export default SelectPosition;



