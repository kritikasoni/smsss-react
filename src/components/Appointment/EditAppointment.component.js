import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { editAppointment } from './appointment.reducer';
import SelectRoom from 'components/SelectRoom';
import TimePicker from 'components/TimePicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import moment from 'moment';

export class EditAppointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointment: {
        id: props.appointmentId,
        patient: props.patientId,
        doctor: props.doctor.id,
        time: {
          hour: props.time.hour,
          minute: props.time.minute
        },
        date: props.date,
        room: props.room
      }
    }
    this._onSubmit = this._onSubmit.bind(this);
    this._onRoomChange = this._onRoomChange.bind(this);
    this._onTimeHourChange = this._onTimeHourChange.bind(this);
    this._onTimeMinuteChange = this._onTimeMinuteChange.bind(this);
    this._onDateChange = this._onDateChange.bind(this);
  }

  _onSubmit(e) {
    e.preventDefault();
    let appointment = this.state.appointment;
    let time = appointment.time;
    appointment.date = appointment.date.set({'hour' :time.hour,'minute': time.minute})
    this.props.editAppointment(this.props.appointmentId,appointment);
    this.props.closeModal();
  }

  _onRoomChange(e){
    this.setState({appointment: {...this.state.appointment, room: e ? e.value : 0}});
  }

  _onTimeHourChange(e) {
    const time = {...this.state.appointment.time, hour: e.target.value};
    this.setState({appointment: {...this.state.appointment, time: time}});
  }

  _onTimeMinuteChange(e) {
    const time = {...this.state.appointment.time, minute: e.target.value};
    this.setState({appointment: {...this.state.appointment, time: time}});
  }
  _onDateChange(date) {
    this.setState({appointment: {...this.state.appointment, date: date}});
  }

  render() {
    return (
      <Modal show={!this.props.isModalClosed} onHide={() => {this.props.closeModal()}}>
        <Modal.Header closeButton>
          <Modal.Title>Add appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{marginBottom:'30px'}}>
          <Form horizontal onSubmit={this._onSubmit} role="form">
            <FormGroup controlId="formHorizontalRoom">
              <Col componentClass={ControlLabel} xs={2}>
                Room :
              </Col>
              <Col xs={10}>
                <SelectRoom onChange={this._onRoomChange} value={this.state.appointment.room} />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalTime">
              <Col componentClass={ControlLabel} xs={2}>
                Time :
              </Col>
              <Col xs={10} >
                <TimePicker hour={this.state.appointment.time.hour + ''} minute={this.state.appointment.time.minute + ''}
                            onHourChange={this._onTimeHourChange} onMinuteChange={this._onTimeMinuteChange}
                />
              </Col>
            </FormGroup>
            <FormGroup controlId="formHorizontalDate">
              <Col componentClass={ControlLabel} xs={2}>
                Date :
              </Col>
              <Col xs={10} >
                <DatePicker
                  className={'form-control col-md-6 pull-left'}
                  dateFormat={'YYYY/MM/DD'}
                  selected={this.state.appointment.date}
                  onChange={this._onDateChange} />
              </Col>
            </FormGroup>
            <Col xs={12} >
              <Button type="submit" bsStyle={'primary'} className={`pull-right`}>SUBMIT</Button>
            </Col>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => ({
  doctor: state.auth.user
})

const mapDispatchToProps = {
  editAppointment
}

EditAppointment.propTypes = {
  appointmentId: PropTypes.any.isRequired,
  patientId: PropTypes.any.isRequired,
  doctor: PropTypes.object.isRequired,
  isModalClosed: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  time: PropTypes.object.isRequired,
  date: PropTypes.any.isRequired,
  room: PropTypes.number.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAppointment);
