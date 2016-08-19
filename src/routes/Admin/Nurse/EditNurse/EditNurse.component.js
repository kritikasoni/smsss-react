import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import { editNurse, deleteNurse } from './../nurse.reducer';
import classes from './EditNurse.component.scss';
import SelectPosition from 'components/SelectPosition';
import SelectDepartment from 'components/SelectDepartment';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
export default class EditNurse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName:'',
      lastName:'',
      department:0,
      email:'',
      position:0,
      password:''
    };
    this._onSubmit = this._onSubmit.bind(this);
    this._onPositionChange = this._onPositionChange.bind(this);
    this._onDepartmentChange = this._onDepartmentChange.bind(this);
  }
  _onSubmit(e) {
    e.preventDefault();
    let nurse = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      department: this.state.department.id,
      email:this.state.email,
      position:this.state.position.id,
      password:this.state.password
    };
    if(this.state.password === ''){
      delete nurse.password;
    }
    this.props.editNurse(this.props.params.id, nurse);
  }

  _onDelete(id) {
    this.props.deleteNurse(this.props.params.id);
  }

  componentWillMount() {
    Http
      .get(`${BackendUrl}/nurses/`+this.props.params.id)
      .then(response => {
        this.setState({
          firstName : response.data.firstName,
          lastName: response.data.lastName,
          department: response.data.department.id,
          email: response.data.email,
          position: response.data.position.id,
          password: ''
        });
      });
  }
  _onPositionChange(e) {
    this.setState({ position: e ? e.value : 0});
  }
  _onDepartmentChange(e) {
    this.setState({department: e ? e.value : 0});
  }

  render() {
    return (
      <div>
        <div className="pull-right">
          <Button bsStyle="danger" className={classes['nurse-delete__button']} onClick={this._onDelete}>DELETE</Button>
        </div>
        <Form horizontal onSubmit={this._onSubmit} role="form">
          <h2>{`Edit nurse: ${this.state.firstName} ${this.state.lastName}`}</h2>
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
          <FormGroup controlId="formHorizontalDepartment">
            <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
              Department :
            </Col>
            <Col xs={10} sm={3}>
              <SelectDepartment onChange={this._onDepartmentChange} value={this.state.department}/>
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
              Email :
            </Col>
            <Col xs={10} sm={3}>
              <FormControl type="text" placeholder="Email"
                           value={this.state.email}
                           onChange={(e) => this.setState({email: e.target.value})}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
              Email :
            </Col>
            <Col xs={10} sm={3}>
              <FormControl type="password" placeholder="Password"
                           value={this.state.password}
                           onChange={(e) => this.setState({password: e.target.value})}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalPosition">
            <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
              Position :
            </Col>
            <Col xs={10} sm={3}>
              <SelectPosition
                placeholder={'Select position'}
                onChange={this._onPositionChange}
                value={this.state.position}
              />
            </Col>
          </FormGroup>
          <Button type="submit" className={`btn ${classes.submitbut}`}>SUBMIT</Button>
        </Form>
      </div>
    );
  }
}


