import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addPatient } from "../patient.reducer";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import classes from './AddPatient.component.scss';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';

export class AddPatient extends Component {
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
      phone:'',
      password: ''
    };
    this._onSubmit = this._onSubmit.bind(this);
    this._handleDobChange = this._handleDobChange.bind(this);
  }
  _onSubmit(e) {
    e.preventDefault();
    const patient = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email:this.state.email,
      idCardNo:this.state.idCardNo,
      dob:this.state.dob,
      weight:this.state.weight,
      height:this.state.height,
      phone:this.state.phone,
      password: this.state.password
    }
    this.props.addPatient(patient);
  }

  _handleDobChange(date) {
    this.setState({dob: date});
  }

  render() {
    return (
      <Form horizontal onSubmit={this._onSubmit} role="form">
        <h2>Add patient</h2>
        <FormGroup controlId="formHorizontalFirstName">
          <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
            First name :
          </Col>
          <Col xs={10} sm={3}>
            <FormControl type="text" placeholder="First name"
                         value={this.state.firstName}
                         onChange={(e) => this.setState({firstName: e.target.value})}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalLastName">
          <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
            Last name :
          </Col>
          <Col xs={10} sm={3}>
            <FormControl type="text" placeholder="Last name"
                         value={this.state.lastName}
                         onChange={(e) => this.setState({lastName: e.target.value})}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
            Email :
          </Col>
          <Col xs={10} sm={3}>
            <FormControl type="email" placeholder="Email"
                         value={this.state.email}
                         onChange={(e) => this.setState({email: e.target.value})}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
            Password :
          </Col>
          <Col xs={10} sm={3}>
            <FormControl type="password" placeholder="Password"
                         value={this.state.password}
                         onChange={(e) => this.setState({password: e.target.value})}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalIdCardNo">
          <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
            ID card number :
          </Col>
          <Col xs={10} sm={3}>
            <FormControl type="text" placeholder="ID Card Number"
                         value={this.state.idCardNo}
                         onChange={(e) => this.setState({idCardNo: e.target.value})}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalDOB">
          <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
            Date of birth :
          </Col>
          <Col xs={10} sm={3}>
            <DatePicker
              className={'form-control col-md-6 pull-left'}
              dateFormat={'YYYY/MM/DD'}
              selected={this.state.dob}
              onChange={this._handleDobChange} />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalWeight">
          <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
            Weight :
          </Col>
          <Col xs={10} sm={3}>
            <FormControl type="float" placeholder="Weight"
                         value={this.state.weight}
                         onChange={(e) => this.setState({weight: e.target.value})}
            />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalHeight">
          <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
            Height :
          </Col>
          <Col xs={10} sm={3}>
            <FormControl type="float" placeholder="Height"
                         value={this.state.height}
                         onChange={(e) => this.setState({height: e.target.value})}
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPhone">
          <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
            Phone number:
          </Col>
          <Col xs={10} sm={3}>
            <FormControl type="text" placeholder="Phone number"
                         value={this.state.phone}
                         onChange={(e) => this.setState({phone: e.target.value})}
            />
          </Col>
        </FormGroup>
        <Button type="submit" className={`btn ${classes.submitButton}`}>SUBMIT</Button>
      </Form>
    );
  }
}

AddPatient.propTypes = {
  addPatient: PropTypes.func.isRequired
};
const mapDispatchToProps = {
  addPatient
}
export default connect(null,mapDispatchToProps)(AddPatient);
