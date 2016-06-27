import React, { Component } from 'react';
import axios from 'axios'; //library เอาไว้ส่งข้อมูล
export default class AddDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName:'',
      lastName:'',
      department:''
    };
    this._onSubmit = this._onSubmit.bind(this);
  }
  _onSubmit(e) {
    e.preventDefault();
    console.log('submit');
    axios
      .post('http://localhost:1337/doctors',{ //ใช้เพื่อส่งข้อมูล
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        department: this.state.department
      })
      .then(response => {
        console.log(response);
        alert('success');
      })
      .catch(err => {
        console.error(err);
      })
  }
  render() {
    return (
      <form role="form" onSubmit={this._onSubmit}>

        First name:  <input
        type="text"
        name="firstName"
        value={this.state.firstName}
        onChange={(e) => this.setState({firstName: e.target.value})}
      /> <br />
        Last name:  <input
        type="text"
        name="lastName"
        value={this.state.lastName}
        onChange={(e) => this.setState({lastName: e.target.value})}
      /> <br />
        Department:  <input
        type="text"
        name="department"
        value={this.state.department}
        onChange={(e) => this.setState({department: e.target.value})}

      />
        <br />

        <button type="submit" >Submit</button>
      </form>
    );
  }
}

