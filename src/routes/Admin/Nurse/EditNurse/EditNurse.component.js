import React, { Component } from 'react';
import axios from 'axios';
import { BackendUrl } from 'Config';
export default class EditNurse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName:'',
      lastName:'',
      department:0,
      departmentList: [],
      email:'',
      position:'',
      password:''
    };
    this._onSubmit = this._onSubmit.bind(this);
  }
  _onSubmit(e) {
    e.preventDefault();
    console.log('submit');
    axios
      .put(`${BackendUrl}/nurses/`+this.props.params.id,{
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        department: this.state.department,
        email:this.state.email,
        position:this.state.position,
        password:this.state.password
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
      .get(`${BackendUrl}/nurses/`+this.props.params.id)
      .then(response => {
        this.setState({
          firstName : response.data.firstName,
          lastName: response.data.lastName,
          department: response.data.department.id,
          email:response.data.email,
          position:response.data.position,
          password:response.data.password
        });
      });
    axios
      .get('http://localhost:1337/departments')
      .then(response => {
        this.setState({departmentList:response.data });
      })
      .catch(err => {
        console.error(err);
      });
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
        Email:
        <input
          type="email"
          name="email"
          value={this.state.email}
          onChange={(e) => this.setState({email: e.target.value})}
        />
        <br />
        Password:
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={(e) => this.setState({password: e.target.value})}
        />
        <br />
        Position:
        <input
          type="text"
          name="position"
          value={this.state.position}
          onChange={(e) => this.setState({position: e.target.value})}
        />
        <br />
        <button type="submit" >Submit</button>
      </form>
    );
  }
}


