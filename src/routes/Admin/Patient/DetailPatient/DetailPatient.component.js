import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Http from 'helper/Http';
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
import AddAppointment from 'components/Appointment/AddAppointment.component';
import ListAppointment from 'components/Appointment/ListAppointment.component';

export class DetailPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient:  {
        id: 0,
        firstName:'',
        lastName:'',
        email:'',
        idCardNo: '',
        dob: moment(),
        weight: 0,
        height: 0,
        phone:''
      },
      isModalClosed: true,
      isAddAppointmentModalClosed: true,
      isListAppointmentModalClosed: true
    };

    this._editPatient = this._editPatient.bind(this);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
  }

  _editPatient() {
    this.context.router.push(`/admin/patients/${this.state.patient.id}/edit`);
  }

  componentWillMount() {
    Http
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
            <Button className="col-xs-12" onClick={() => this.setState({isAddAppointmentModalClosed: false})}>
              Add appointment
            </Button>
            <Button className="col-xs-12" onClick={() => this.setState({isListAppointmentModalClosed: false})}>
              View appointments
            </Button>
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
        <AddAppointment
          isModalClosed={this.state.isAddAppointmentModalClosed}
          closeModal={() => this.setState({isAddAppointmentModalClosed: true})}
          patientId={this.props.params.id} />
        <ListAppointment
          isModalClosed={this.state.isListAppointmentModalClosed}
          closeModal={() => this.setState({isListAppointmentModalClosed: true})}
          patientId={this.props.params.id} />
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
