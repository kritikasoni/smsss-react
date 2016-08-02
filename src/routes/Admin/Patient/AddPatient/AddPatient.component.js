import React, { Component } from 'react';
import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import classes from './AddPatient.component.scss';

export default class AddPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName:'',
      lastName:'',
      email:'',
      idCardNo: '',
      dob: moment(),
      weight: 0,
      height: 0,
      phone:''
    };
    this._onSubmit = this._onSubmit.bind(this);
    this._handleDobChange = this._handleDobChange.bind(this);
  }
  _onSubmit(e) {
    e.preventDefault();
    console.log('submit');
    Http
      .post(`${BackendUrl}/patients`,{ //ใช้เพื่อส่งข้อมูล
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

  _handleDobChange(date) {
    this.setState({dob: date});
  }

  render() {
    return (
      <form role="form" onSubmit={this._onSubmit}>

        <div className={classes.topic}>

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6 text-right"> FIRST NAME :</div>
              <input className="col-md-3"
                     type="text"
                     name="firstName"
                     value={this.state.firstName}
                     onChange={(e) => this.setState({firstName: e.target.value})}/>
            </div>
          </div>
          <br/>

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6 text-right">LAST NAME :</div>
              <input className="col-md-3"
                     type="text"
                     name="lastName"
                     value={this.state.lastName}
                     onChange={(e) => this.setState({lastName: e.target.value})}/>
            </div>
          </div>
          <br/>

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6 text-right">EMAIL :</div>
              <input className="col-md-3"
                     type="email"
                     name="email"
                     value={this.state.email}
                     onChange={(e) => this.setState({email: e.target.value})}/>
            </div>
          </div>
          <br />


          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6 text-right">ID CARD NUMBER :</div>
              <input className="col-md-3"
                     type="string"
                     name="idCardNo"
                     value={this.state.idCardNo}
                     onChange={(e) => this.setState({idCardNo: e.target.value})}/>
            </div>
          </div>
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

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6 text-right">WEIGHT :</div>
              <input className="col-md-3"
                     type="float"
                     name="weight"
                     value={this.state.weight}
                     onChange={(e) => this.setState({weight: e.target.value})}/>
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6 text-right">HEIGHT :</div>
              <input className="col-md-3"
                     type="float"
                     name="height"
                     value={this.state.height}
                     onChange={(e) => this.setState({height: e.target.value})}/>
            </div>
          </div>
          <br />

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6 text-right">PHONE :</div>
              <input className="col-md-3"
                     type="string"
                     name="phone"
                     value={this.state.phone}
                     onChange={(e) => this.setState({phone: e.target.value})}/>
            </div>
          </div>
        </div>


        <button type="submit" className={`btn ${classes.submitButton}`}>SUBMIT</button>
      </form>
    );
  }
}
