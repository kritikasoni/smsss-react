import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadAppointment, deleteAppointment } from './appointment.reducer';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import moment from 'moment';
export class ListAppointment extends Component {
  constructor(props,context) {
    super(props,context);
  }

  componentWillMount() {
    this.props.loadAppointment(this.props.patientId);
  }

  _editAppointment(id) {
    this.context.router.push(`/doctor/appointments/${id}/edit`);
  }
  _deleteAppointment(id) {
    this.props.deleteAppointment(id);
  }

  render() {
    let appointments = this.props.appointments.map((appointment) => {
      return (
        <div key={appointment.id} style={{paddingLeft:'10px'}}>
          <p>Date time: {moment(appointment.date).format('YYYY/MM/DD HH:mm').toString()}</p>
          <p>Room: {appointment.room.name}</p>
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
          <Modal.Title>Appointments</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{marginBottom:'30px'}}>
          <h1>Appointments</h1>
          {appointments}
        </Modal.Body>
      </Modal>
    );
  }
}

ListAppointment.contextTypes = {
  router: PropTypes.any.isRequired
}
ListAppointment.propTypes = {
  patientId: PropTypes.any.isRequired,
  appointments: PropTypes.array.isRequired,
  loadAppointment: PropTypes.func.isRequired,
  isModalClosed: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  appointments: state.appointments.appointments
})
const mapDispatchToProps = {
  loadAppointment,
  deleteAppointment
}
export default connect(mapStateToProps, mapDispatchToProps)(ListAppointment);
