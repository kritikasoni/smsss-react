import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { editAppointment, deleteAppointment } from './appointment.reducer';
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
        patient: props.patient.id,
        doctor: props.doctor.id,
        time: {
          hour: moment(props.appointment.date).get('hours'),
          minute: moment(props.appointment.date).get('minutes')
        },
        date: moment(props.appointment.date)
      }
    }
    this._onSubmit = this._onSubmit.bind(this);
    this._onTimeHourChange = this._onTimeHourChange.bind(this);
    this._onTimeMinuteChange = this._onTimeMinuteChange.bind(this);
    this._onDateChange = this._onDateChange.bind(this);
    this._onDeleteAppointment = this._onDeleteAppointment.bind(this);
  }

  _onSubmit(e) {
    e.preventDefault();
    let appointment = this.state.appointment;
    let time = appointment.time;
    appointment.date = appointment.date.set({'hour' :time.hour,'minute': time.minute}).toISOString();
    delete appointment.time;
    this.props.editAppointment(this.props.appointment.id,appointment);
    this.props.closeModal();
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
  _onDeleteAppointment() {
    this.props.deleteAppointment(this.props.appointment.id);
    this.props.closeModal();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      appointment: {
        patient: nextProps.patient.id,
        doctor: nextProps.doctor.id,
        time: {
          hour: moment(nextProps.appointment.date).get('hours'),
          minute: moment(nextProps.appointment.date).get('minutes')
        },
        date: moment(nextProps.appointment.date)
      }
    })
  }

  render() {
    return (
      <Modal show={!this.props.isModalClosed} onHide={() => {this.props.closeModal()}}>
        <Modal.Header closeButton>
          <Modal.Title>
            {`Update appointment of patient: ${this.props.patient.firstName} ${this.props.patient.lastName}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{marginBottom:'30px'}}>
          <Button bsStyle={'danger'} className={`pull-right`} onClick={this._onDeleteAppointment}>Delete</Button>
          <Form horizontal onSubmit={this._onSubmit} role="form">
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
        <Modal.Footer style={{marginTop:'50px'}}>
          <Button bsStyle="danger" onClick={() => { this.props.closeModal() }}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => ({
  doctor: state.auth.user,
  patient: state.patients.selectedPatient,
  appointment: state.appointments.selectedAppointment
})


const mapDispatchToProps = {
  editAppointment,
  deleteAppointment
}

EditAppointment.propTypes = {
  appointment: PropTypes.object.isRequired,
  patient: PropTypes.object.isRequired,
  doctor: PropTypes.object.isRequired,
  isModalClosed: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAppointment);

