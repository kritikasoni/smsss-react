import React, { Component, PropTypes } from 'react';
import Http from 'helper/Http';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { BackendUrl } from 'Config';

export class SelectRoom extends Component {
  constructor(props, context) {
    super(props, context);
    this._getRoomOptions = this._getRoomOptions.bind(this);
  }
  _getRoomOptions(input, callback) {
    const toOptionFormat = (room) => ({
      label: room.name,
      value: room.id
    });
    Http
      .get(`${BackendUrl}/rooms`)
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
        loadOptions={this._getRoomOptions}
      />
    )
  }
}

SelectRoom.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any
}

export default SelectRoom;



