import React, { Component } from 'react';
import axios from 'axios'; //library เอาไว้ส่งข้อมูล
export default class AddNurse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName:'',
      lastName:'',
      email:'',
      idCardNo: '',
      dob: new Date(),
      weight: 0,
      height: 0,
      phone:''
    };
    this._onSubmit = this._onSubmit.bind(this);
  }
  _onSubmit(e) {
    e.preventDefault();
    console.log('submit');
    axios
      .post('http://localhost:1337/patients',{ //ใช้เพื่อส่งข้อมูล
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email:this.state.email,
        idCardNo:this.state.idCardNo,
        dob:this.state.dob,
        weight:this.state.weight,
        height:this.state.height,
        phone:this.state.phone
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

        First name:
        <input
          type="text"
          name="firstName"
          value={this.state.firstName}
          onChange={(e) => this.setState({firstName: e.target.value})}
        />
        <br />
        Last name:
        <input
          type="text"
          name="lastName"
          value={this.state.lastName}
          onChange={(e) => this.setState({lastName: e.target.value})}
        />
        <br />

        Email:
        <input
          type="email"
          name="email"
          value={this.state.email}
          onChange={(e) => this.setState({email: e.target.value})}
        />
        <br />
        id card number:
        <input
          type="string"
          name="idCardNo"
          value={this.state.idCardNo}
          onChange={(e) => this.setState({idCardNo: e.target.value})}
        />
        <br />
        Date of Birth:
        <input
          type="date"
          name="dob"
          value={this.state.dob}
          onChange={(e) => this.setState({dob: e.target.value})}
        />
        <br />
        Weight:
        <input
          type="float"
          name="weight"
          value={this.state.weight}
          onChange={(e) => this.setState({weight: e.target.value})}
        />
        <br />
        Height:
        <input
          type="float"
          name="height"
          value={this.state.height}
          onChange={(e) => this.setState({height: e.target.value})}
        />
        <br />
        Phone:
        <input
          type="string"
          name="phone"
          value={this.state.phone}
          onChange={(e) => this.setState({phone: e.target.value})}
        />
        <br />
        <button type="submit" >Submit</button>
      </form>
    );
  }
}

