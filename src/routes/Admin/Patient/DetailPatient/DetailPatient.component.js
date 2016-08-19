import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { BackendUrl } from 'Config';
import Button from 'react-bootstrap/lib/Button';
import Table from 'react-bootstrap/lib/Table';
import Col from 'react-bootstrap/lib/Col';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import moment from 'moment';
import TimePicker from 'components/TimePicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SelectRoom from 'components/SelectRoom';
import SelectMedicine from 'components/SelectMedicine';
import SelectTimeToTake from 'components/SelectTimeToTake';

export class DetailPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: {},
      isModalClosed: true
    };

    this._editPatient = this._editPatient.bind(this);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
  }

  _editPatient() {
    this.context.router.push(`/admin/patients/${this.state.patient.id}/edit`);
  }

  componentWillMount() {
    axios
      .get(`${BackendUrl}/patients/${this.props.params.id}`)
      .then(({data}) => {
        this.setState({
          patient: data
        });
      });

  }
  _actionButtons(){
    switch(this.props.authRole){
      case 'admin':
        return (<Button onClick={this._editPatient}>Edit</Button>);
      case 'doctor':
        return (
          <div>
            <Button className="col-xs-12" onClick={this._openModal}>Add appointment</Button>
            <Button className="col-xs-12">View appointments</Button>
            <Button className="col-xs-12">Add symptom</Button>
            <Button className="col-xs-12">View symptoms</Button>
            <Button className="col-xs-12">Add prescription</Button>
            <Button className="col-xs-12">View prescriptions</Button>
          </div>);
      case 'nurse':
        return (<Button onClick={this._openModal}>Update preliminary checkup</Button>);
      default:
        return null;
    }
  }

  _openModal(){
    this.setState({isModalClosed: false});
  }
  _closeModal(){
    this.setState({isModalClosed: true});
  }

  render() {
    let actionButtons = this._actionButtons();

    return (
      <Col xs={12} sm={10} smOffset={1}>
        <Table responsive bsClass="table table-striped">
          <thead>
          <tr>
            <th>ID Card number</th>
            <th>First Name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Date of birth</th>
            <th>Weight</th>
            <th>Height</th>
            <th>Blood pressure</th>
            <th>Phone number</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{this.state.patient.idCardNo}</td>
            <td>{this.state.patient.firstName}</td>
            <td>{this.state.patient.lastName}</td>
            <td>{this.state.patient.email}</td>
            <td>{moment(this.state.patient.dob).format('YYYY/MM/DD').toString()}</td>
            <td>{this.state.patient.weight}</td>
            <td>{this.state.patient.height}</td>
            <td>{this.state.patient.bloodPressure}</td>
            <td>{this.state.patient.phone}</td>
            <td>
              {actionButtons}
            </td>
          </tr>
          </tbody>
        </Table>
        <Modal show={!this.state.isModalClosed} onHide={() => {this._closeModal()}}>
          <Modal.Header closeButton>
            <Modal.Title>{`Update prescription of patient: ${this.state.patient.firstName} ${this.state.patient.lastName}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal role="form">
              <Col xs={12} style={{marginBottom:'25px'}}>
                <Button className="pull-right" bsStyle="danger" onClick={() => { this._closeModal() }}>Remove medicine</Button>
              </Col>
              <FormGroup controlId="formHorizontalWeight">
                <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
                  Medicine:
                </Col>
                <Col xs={10} sm={5}>
                  <SelectMedicine onChange={() => {}} value={1}/>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalWeight">
                <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
                  Time to take:
                </Col>
                <Col xs={10} sm={5}>
                  <SelectTimeToTake onChange={() => {}} value={6}/>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalWeight">
                <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
                  Dosage:
                </Col>
                <Col xs={10} sm={5}>
                  <FormControl type="number" placeholder="Dosage number"
                               value={1}
                               onChange={(e) => this.setState({name: e.target.value})}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalWeight">
                <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
                  Remark:
                </Col>
                <Col xs={10} sm={5}>
                <textarea className="form-control">Can stop after you feel better</textarea>
                </Col>
              </FormGroup>
              <hr />
              <Col xs={12} style={{marginBottom:'25px'}}>
                <Button className="pull-right" bsStyle="danger" onClick={() => { this._closeModal() }}>Remove medicine</Button>
              </Col>
              <FormGroup controlId="formHorizontalWeight">
                <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
                  Medicine:
                </Col>
                <Col xs={10} sm={5}>
                  <SelectMedicine onChange={() => {}} value={3}/>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalWeight">
                <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
                  Time to take:
                </Col>
                <Col xs={10} sm={5}>
                  <SelectTimeToTake onChange={() => {}} value={15}/>
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalWeight">
                <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
                  Dosage:
                </Col>
                <Col xs={10} sm={5}>
                  <FormControl type="number" placeholder="Dosage number"
                               value={2}
                               onChange={(e) => this.setState({name: e.target.value})}
                  />
                </Col>
              </FormGroup>
              <FormGroup controlId="formHorizontalWeight">
                <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
                  Remark:
                </Col>
                <Col xs={10} sm={5}>
                  <textarea className="form-control">None</textarea>
                </Col>
              </FormGroup>
            </Form>
            <hr />
            <Col xs={12}>
              <Button className="pull-right" bsStyle="primary" onClick={() => { this._closeModal() }}>More medicine</Button>
            </Col>
          </Modal.Body>
          <Modal.Footer style={{marginTop:'50'}}>
            <Button bsStyle="danger" className="pull-left" onClick={() => { this._closeModal() }}>Delete</Button>
            <Button bsStyle="danger" onClick={() => { this._closeModal() }}>Close</Button>
            <Button bsStyle="primary" onClick={() => { this._closeModal() }}>Update</Button>
          </Modal.Footer>
        </Modal>
      </Col>
    );
  }
}

DetailPatient.contextTypes = {
  router: PropTypes.object,
};
DetailPatient.propTypes = {
  authRole: PropTypes.string
};
const mapStateToProps = (state) => ({
  authRole: state.auth ? state.auth.user.role.name : ''
});

export default connect(mapStateToProps)(DetailPatient);
