import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import { deletePatient } from './../patient.reducer';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import classes from './EditPatient.component.scss';
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
      phone: '',
      bloodPressure: ''
    };
    this._onSubmit = this._onSubmit.bind(this);
    this._handleDobChange = this._handleDobChange.bind(this);
    this._onDelete = this._onDelete.bind(this);
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

  _onDelete() {
    this.props.deletePatient(this.props.params.id);
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
          phone:response.data.phone,
          bloodPressure: response.data.bloodPressure ? response.data.bloodPressure : ''
        });
      });

  }
  render() {
    return (
      <div>
        <div className="pull-right">
          <Button bsStyle="danger" className={classes['patient-delete__button']} onClick={this._onDelete}>DELETE</Button>
        </div>
        <Form horizontal onSubmit={this._onSubmit} role="form">
          <h2>{`Edit Patient: ${this.state.firstName} ${this.state.lastName} (${this.state.idCardNo})`}</h2>
          <FormGroup controlId="formHorizontalFirstName">
            <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
              First name :
            </Col>
            <Col xs={10} sm={3}>
              <FormControl type="text" placeholder="first name"
                           value={this.state.firstName}
                           onChange={(e) => this.setState({firstName: e.target.value})}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalLastName">
            <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
              Last name:
            </Col>
            <Col xs={10} sm={3}>
              <FormControl type="text" placeholder="last name"
                           value={this.state.lastName}
                           onChange={(e) => this.setState({lastName: e.target.value})}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
              Email:
            </Col>
            <Col xs={10} sm={3}>
              <FormControl type="text" placeholder="Email"
                           value={this.state.email}
                           onChange={(e) => this.setState({email: e.target.value})}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalIdCardNo">
            <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
              ID card no:
            </Col>
            <Col xs={10} sm={3}>
              <FormControl type="text" placeholder="ID card no"
                           value={this.state.idCardNo}
                           onChange={(e) => this.setState({idCardNo: e.target.value})}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalDob">
            <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
              Date of birth:
            </Col>
            <Col xs={10} sm={3}>
              <DatePicker
                className={'form-control col-xs-12'}
                dateFormat={'YYYY/MM/DD'}
                selected={this.state.dob}
                onChange={this._handleDobChange} />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalWeight">
            <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
              Weight:
            </Col>
            <Col xs={10} sm={3}>
              <FormControl type="text" placeholder="Weight"
                           value={this.state.weight}
                           onChange={(e) => this.setState({weight: e.target.value})}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalHeight">
            <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
              Height:
            </Col>
            <Col xs={10} sm={3}>
              <FormControl type="text" placeholder="height"
                           value={this.state.height}
                           onChange={(e) => this.setState({height: e.target.value})}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalBloodPressure">
            <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
              Blood pressure:
            </Col>
            <Col xs={10} sm={3}>
              <FormControl type="text" placeholder="bloodPressure"
                           value={this.state.bloodPressure}
                           onChange={(e) => this.setState({bloodPressure: e.target.value})}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPhone">
            <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
              Phone:
            </Col>
            <Col xs={10} sm={3}>
              <FormControl type="text" placeholder="phone"
                           value={this.state.phone}
                           onChange={(e) => this.setState({phone: e.target.value})}
              />
            </Col>
          </FormGroup>
          <Button bsStyle="primary" type="submit" >Submit</Button>
        </Form>
      </div>
    );
  }
}
EditPatient.propTypes = {
  deletePatient: PropTypes.func.isRequired
}
const mapDispatchToProps = {
  deletePatient
}
export default connect(null,mapDispatchToProps)(EditPatient);

