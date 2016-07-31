import React, { Component } from 'react';
import axios from 'axios';
import { BackendUrl } from 'Config';
export default class DetailPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName:'',
      lastName:'',
      email:'',
      idCardNo: '',
      dob:'',
      weight:'',
      height:'',
      phone:''
    };

    this._deletePatient = this._deletePatient.bind(this);
    this._editPatient = this._editPatient.bind(this);
  }
  _deletePatient(id) {
    axios
      .delete(`${BackendUrl}/patients/`+id)
      .then(response => {
        let patients = this.state.patients.filter(patient => patient.id != id);
        this.setState({patients});
      })
      .catch(error => console.log);
  }
  _editPatient(id) {
    this.context.router.push(`/patients/${id}`);
  }



  componentWillMount() {
    axios
      .get(`${BackendUrl}/patients/`+this.props.params.id)
      .then(response => {
        this.setState({
          firstName : response.data.firstName,
          lastName: response.data.lastName,
          email:response.data.email,
          idCardNo:response.data.idCardNo,
          dob:response.data.dob,
          weight:response.data.weight,
          height:response.data.height,
          phone:response.data.phone
        });
      });

  }
  render() {
    return (
      <form role="form" >

        <div>{this.state.firstName}</div>
        {this.state.lastName}
        {this.state.email}
        {this.state.idCardNo}
        {this.state.dob}
        {this.state.weight}
        {this.state.height}
        {this.state.phone}
          onChange={(e) => this.setState({dob: e.target.value})}
        />
        <br />
        <button type="submit" >Submit</button>
      </form>
    );
  }
}


