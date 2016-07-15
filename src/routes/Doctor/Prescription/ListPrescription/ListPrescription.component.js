import React, { Component } from 'react';
import axios from 'axios';
import Prescription from './Prescription.component';
import { BackendUrl } from 'Config';

export default class ListPrescription extends Component {
  constructor(props,context) {
    super(props,context);
    this.state =  {
      prescriptions: []
    };
    this._deletePrescription = this._deletePrescription.bind(this);
    this._editPrescription = this._editPrescription.bind(this);
  }

  componentWillMount() {
    axios
      .get(`${BackendUrl}/prescriptions/patient/${this.props.params.id}`)
      .then(response => {
        this.setState({
          prescriptions : response.data
        });
        console.log('12312321');
        console.log(this.state.prescriptions);
      })
      .catch((err) => console.error);
  }

  _deletePrescription(id) {
    axios
      .delete(`${BackendUrl}/prescriptions/`+id)
      .then(response => {
        let prescriptions = this.state.prescriptions.filter(prescription => prescription.id != id);
        this.setState({prescriptions});
      })
      .catch(error => console.log);
  }
  _editPrescription(id) {
    this.context.router.push(`/prescriptions/${id}`);
  }
  render() {
    let prescriptions = this.state.prescriptions.map((prescription) => { //map ทำเพื่อเอาtagไปใส่
      return (
        <div>
           
          {prescription.doctor.firstName}
          <a href={`/doctor/prescriptions/${prescription.id}/edit`} ><button type="button">Edit</button></a>
          <button type="button" onClick={() => this._deletePrescription(prescription.id)}>Delete</button>
        </div>
      );
    });
    return (
      <div>
        <h1>Prescriptions</h1>
        {prescriptions}
      </div>
    );
  }


}

