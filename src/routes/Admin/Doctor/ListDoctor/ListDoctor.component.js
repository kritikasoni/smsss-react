import React, { Component } from 'react';
import axios from 'axios';
import Doctor from './Doctor.component';

export default class DoctorList extends Component {
  constructor(props,context) {
    super(props,context);
    this.state =  {
      doctors: []
    };
    this._deleteDoctor = this._deleteDoctor.bind(this);
    this._editDoctor = this._editDoctor.bind(this);
  }

  componentWillMount() {
    axios
      .get('http://localhost:1337/doctors')
      .then(response => {
        this.setState({
          doctors : response.data
        });
        console.log(this.state.doctors);
      });
  }

  _deleteDoctor(id) {
    axios
      .delete('http://localhost:1337/doctors/'+id)
      .then(response => {
        let doctors = this.state.doctors.filter(doctor => doctor.id != id);
        this.setState({doctors});
      })
      .catch(error => console.log);
  }
  _editDoctor(id) {
    this.context.router.push(`/doctors/${id}`);
  }
  render() {
    let doctors = this.state.doctors.map((doctor) => { //map ทำเพื่อเอาtagไปใส่
      return (
        <div>
          <Doctor key={ doctor.id } {...doctor} />
          <a href={'/doctors/'+doctor.id} ><button type="button">Edit</button></a>
          <button type="button" onClick={() => this._deleteDoctor(doctor.id)}>Delete</button>
        </div>
      );
    });
    return (
      <div>
        <h1>Doctors</h1>
        {doctors}
      </div>
    );
  }


}

