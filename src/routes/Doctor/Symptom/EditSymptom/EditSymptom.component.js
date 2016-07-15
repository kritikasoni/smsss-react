import React, { Component } from 'react';
import axios from 'axios';
import { BackendUrl } from 'Config';
export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient:{},
      detail:'' }
    ;
    this._onSubmit = this._onSubmit.bind(this);
  }
  _onSubmit(e) {
    e.preventDefault();
    console.log('submit');
    axios
      .put(`${BackendUrl}/symptoms/`+this.props.params.id,{
        patient: this.state.patient.id,
        detail: this.state.detail,
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      })
  }

  componentWillMount() {
    axios
      .get(`${BackendUrl}/symptoms/` + this.props.params.id)
      .then(response => {
        this.setState({
          patient: response.data.patient,
          detail: response.data.detail,

        });
      });
  }
  render() {
    return (
      <form role="form" onSubmit={this._onSubmit}>

        Detail:
        <textarea
          name="detail"
          value={this.state.detail}
          onChange={(e) => this.setState({detail: e.target.value})}
        />
        <br />

        <button type="submit" >Submit</button>
      </form>
    );
  }
}


