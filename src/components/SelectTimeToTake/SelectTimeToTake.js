import React, { Component, PropTypes } from 'react';
import Http from 'helper/Http';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import { BackendUrl } from 'Config';

export class SelectTimeToTake extends Component {
  constructor(props, context) {
    super(props, context);
    this._getTimeToTakeOptions = this._getTimeToTakeOptions.bind(this);
  }

  _getTimeToTakeOptions(input, callback) {
    const toOptionFormat = (ttt) => ({
      label: ttt.period,
      value: ttt.id
    });
    Http
      .get(`${BackendUrl}/timeToTakes`)
      .then(({data}) => {
        if(input) {
          callback(null, {
            options: data.filter(ttt => ttt.name.includes(input)).map(ttt => toOptionFormat(ttt)),
            complete: false
          })
        }
        else {
          callback(null, {
            options: data.map(ttt => toOptionFormat(ttt)),
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
        loadOptions={this._getTimeToTakeOptions}
      />
    )
  }
}

SelectTimeToTake.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any
}

export default SelectTimeToTake;



