import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addNurse } from "../nurse.reducer";
import { notify } from 'components/Notification';
import classes from './AddNurse.component.scss';
import SelectPosition from 'components/SelectPosition';
import SelectDepartment from 'components/SelectDepartment';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
export class AddNurse extends Component {
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
    const nurse = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      department: this.state.department,
      email: this.state.email,
      position: this.state.position,
      password: this.state.password
    };
    if(this._validate()){
      this.props.addNurse(nurse);
    }

  }

  _onPositionChange(e) {
    this.setState({ position: e ? e.value : 0 });
  }
  _onDepartmentChange(e) {
    this.setState({department: e ? e.value : 0 });
  }

  _validate() {
    let isValid = true;
    let warningMessages = [];

    if(parseInt(this.state.position) < 1) {
      isValid = false;
      warningMessages = [...warningMessages, `Position is required`];
    }
    if(parseInt(this.state.department) < 1) {
      isValid = false;
      warningMessages = [...warningMessages, `Department is required`];
    }
    if(!isValid) {
      this.props.notify(warningMessages,'Warning!','warn');
    }
    return isValid;
  }

  render() {
    return (
      <Form horizontal onSubmit={this._onSubmit} role="form">
        <h2>Add nurse</h2>
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
        {
          this.props.fetching ?
            <i className="fa fa-spinner fa-spin fa-spinner" aria-hidden="true"></i> :
            <Button type="submit" className={`btn ${classes.submitbut}`}>SUBMIT</Button>
        }
      </Form>
    );
  }
}

AddNurse.propTypes = {
  addNurse: PropTypes.func.isRequired,
  fetching: PropTypes.bool.isRequired,
  notify: PropTypes.func.isRequired
};
const mapStateToProps = (state) => ({
  fetching: state.nurses.fetching
})
const mapDispatchToProps = {
  addNurse,
  notify
}

export default connect(mapStateToProps,mapDispatchToProps)(AddNurse);
