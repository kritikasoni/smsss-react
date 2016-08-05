import React, { Component, PropTypes } from 'react';
import axios from 'axios';
import { BackendUrl } from 'Config';
import Button from 'react-bootstrap/lib/Button';
export default class DetailPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: {}
    };

    this._editPatient = this._editPatient.bind(this);
  }
  static contextTypes = {
    router: PropTypes.object,
  };

  _editPatient() {
    this.context.router.push(`/admin/patients/${this.state.patient.id}/edit`);
  }

  componentWillMount() {
    axios
      .get(`${BackendUrl}/patients/${this.props.params.id}`)
      .then(({data}) => {
        this.setState({
          patient: data
        });
      });

  }
  render() {
    return (
      <form role="form" >
        <p>{this.state.patient.firstName}</p>
        <p>{this.state.patient.lastName}</p>
        <p>{this.state.patient.email}</p>
        <p>{this.state.patient.idCardNo}</p>
        <p>{this.state.patient.dob}</p>
        <p>{this.state.patient.weight}</p>
        <p>{this.state.patient.height}</p>
        <p>{this.state.patient.phone}</p>
        <br />
        <Button onClick={this._editPatient}>Edit</Button>
      </form>
    );
  }
}

