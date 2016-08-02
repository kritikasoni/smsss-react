import React, { Component } from 'react';
import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
export default class EditPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      idCardNo: '',
      dob: moment(),
      weight: '',
      height: '',
      phone: ''
    };
    this._onSubmit = this._onSubmit.bind(this);
    this._handleDobChange = this._handleDobChange.bind(this);
  }

  _onSubmit(e) {
    e.preventDefault();
    console.log('submit');
    Http
      .put(`${BackendUrl}/patients/`+this.props.params.id,{
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
        this.props.history.push('/admin/patients');
      })
      .catch(err => {
        console.error(err);
      })
  }

  _handleDobChange(date) {
    this.setState({dob: date});
  }

  componentWillMount() {
    Http
      .get(`${BackendUrl}/patients/`+this.props.params.id)
      .then(response => {
        this.setState({
          firstName : response.data.firstName,
          lastName: response.data.lastName,
          email:response.data.email,
          idCardNo:response.data.idCardNo,
          dob: moment(response.data.dob),
          weight:response.data.weight,
          height:response.data.height,
          phone:response.data.phone
        });
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
        <div className="row">
          <div className="col-md-6 text-right">DATE OF BIRTH :</div>
          <DatePicker
            className={'col-md-6 pull-left'}
            dateFormat={'YYYY/MM/DD'}
            selected={this.state.dob}
            onChange={this._handleDobChange} />
        </div>
        <br />
        Weight:
        <input
          type="float"
          name="weight"
          value={this.state.weight}
          onChange={(e) => this.setState({dob: e.target.value})}
        />
        <br />
        Height:
        <input
          type="float"
          name="height"
          value={this.state.height}
          onChange={(e) => this.setState({dob: e.target.value})}
        />
        <br />
        Phone:
        <input
          type="string"
          name="phone"
          value={this.state.phone}
          onChange={(e) => this.setState({dob: e.target.value})}
        />
        <br />
        <button type="submit" >Submit</button>
      </form>
    );
  }
}

