import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadAppointment, selectAppointment } from './appointment.reducer';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import moment from 'moment';
export class ListAppointment extends Component {
  constructor(props,context) {
    super(props,context);
    this._editAppointment = this._editAppointment.bind(this);
  }

  componentWillMount() {
    this.props.loadAppointment(this.props.patient.id);
  }

  _editAppointment(id) {
    this.props.selectAppointment(id);
    this.props.onEditAppointment(id);
  }

  _deleteAppointment(id) {
    this.props.deleteAppointment(id);
  }

  render() {
    let appointments = this.props.appointments
      .sort((a,b) => moment(b.date).toDate() - moment(a.date).toDate())
      .map((appointment) => {
        return (
          <div key={`appointment${appointment.id}`} style={{paddingLeft:'10px'}}>
            <p>Date time: {moment(appointment.date).format('YYYY/MM/DD HH:mm').toString()}</p>
            <Col xs={4} xsOffset={8}>
              <Button bsStyle={'primary'} className="col-xs-12" onClick={() => this._editAppointment(appointment.id)}>
                Edit
              </Button>
            </Col>
          </div>
        );
      });
    return (
      <Modal show={!this.props.isModalClosed} onHide={() => {this.props.closeModal()}}>
        <Modal.Header closeButton>
          <Modal.Title>
            {`Appointment of patient: ${this.props.patient.firstName} ${this.props.patient.lastName}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{marginBottom:'30px'}}>
          <h1>Appointments</h1>
          {appointments}
        </Modal.Body>
        <Modal.Footer style={{marginTop:'50px'}}>
          <Button bsStyle="danger" onClick={() => { this.props.closeModal() }}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ListAppointment.contextTypes = {
  router: PropTypes.any.isRequired
}
ListAppointment.propTypes = {
  patient: PropTypes.object.isRequired,
  appointments: PropTypes.array.isRequired,
  loadAppointment: PropTypes.func.isRequired,
  isModalClosed: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onEditAppointment: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  appointments: state.appointments.appointments,
  patient: state.patients.selectedPatient
})
const mapDispatchToProps = {
  loadAppointment,
  selectAppointment
}
export default connect(mapStateToProps, mapDispatchToProps)(ListAppointment);

