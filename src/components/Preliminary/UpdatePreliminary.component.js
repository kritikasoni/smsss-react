import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { editPatientPreliminary } from './../../routes/Admin/Patient/patient.reducer';
import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import moment from 'moment';

export class UpdatePreliminary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: props.patient.height || 0,
      weight: props.patient.weight || 0,
      bloodPressure: props.patient.bloodPressure || 'N/A',
      heartRate: props.patient.heartRate || ''
    }
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onSubmit(e) {
    e.preventDefault();
    this.props.editPatientPreliminary(this.props.patient.id, this.state);
    this.props.closeModal();
  }

  render() {
    return (
      <Modal show={!this.props.isModalClosed} onHide={() => {this.props.closeModal()}}>
        <Modal.Header closeButton>
          <Modal.Title>
            {`Update preliminary health check up of patient : ${this.props.patient.firstName} ${this.props.patient.lastName}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{marginBottom:'30px'}}>
          <Form horizontal onSubmit={this._onSubmit} role="form">
            <FormGroup controlId="formHorizontalHeight">
              <Col componentClass={ControlLabel} xs={2}>
                Height :
              </Col>
              <Col xs={10}>
                <FormControl type="number" placeholder="Height"
                             value={this.state.height}
                             onChange={(e) => this.setState({height: e.target.value})}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalWeight">
              <Col componentClass={ControlLabel} xs={2}>
                Weight :
              </Col>
              <Col xs={10} >
                <FormControl type="text" placeholder="Weight"
                             value={this.state.weight}
                             onChange={(e) => this.setState({weight: e.target.value})}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalBloodPressure">
              <Col componentClass={ControlLabel} xs={2}>
                Blood pressure :
              </Col>
              <Col xs={10} >
                <FormControl type="text" placeholder="Blood pressure"
                             value={this.state.bloodPressure}
                             onChange={(e) => this.setState({bloodPressure: e.target.value})}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalHeartRate">
              <Col componentClass={ControlLabel} xs={2}>
                Heart rate (bpm) :
              </Col>
              <Col xs={10} >
                <FormControl type="text" placeholder="Heart rate"
                             value={this.state.heartRate}
                             onChange={(e) => this.setState({heartRate: e.target.value})}
                />
              </Col>
            </FormGroup>
            <Col xs={12} >
              <Button bsStyle={'danger'} className={`pull-right`} onClick={this.props.closeModal}>Cancel</Button>
              <Button type="submit" bsStyle={'primary'} className={`pull-right`}>Update</Button>
            </Col>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  editPatientPreliminary
}

UpdatePreliminary.propTypes = {
  editPatientPreliminary: PropTypes.func.isRequired,
  patient: PropTypes.object.isRequired,
  isModalClosed: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default connect(null, mapDispatchToProps)(UpdatePreliminary);
