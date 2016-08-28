import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadPatientById } from './../patient.reducer';
import Http from 'helper/Http';
import { BackendUrl, role } from 'Config';
import Button from 'react-bootstrap/lib/Button';
import Table from 'react-bootstrap/lib/Table';
import Col from 'react-bootstrap/lib/Col';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import AddAppointment from 'components/Appointment/AddAppointment.component';
import ListAppointment from 'components/Appointment/ListAppointment.component';
import EditAppointment from 'components/Appointment/EditAppointment.component';
import AddSymptom from 'components/Symptom/AddSymptom.component';
import ListSymptom from 'components/Symptom/ListSymptom.component';
import EditSymptom from 'components/Symptom/EditSymptom.component';
import UpdatePreliminary from 'components/Preliminary';
import AddPrescription from 'components/Prescription/AddPrescription.component';
import ListPrescription from 'components/Prescription/ListPrescription.component';
import EditPrescription from 'components/Prescription/EditPrescription.component';
import FontAwesome from 'react-fontawesome';

export class DetailPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalClosed: true,
      isAddAppointmentModalClosed: true,
      isListAppointmentModalClosed: true,
      isEditAppointmentModalClosed: true,
      isAddSymptomModalClosed: true,
      isListSymptomModalClosed: true,
      isEditSymptomModalClosed: true,
      isUpdatePreliminaryModalClosed: true,
      isAddPrescriptionModalClosed: true,
      isListPrescriptionModalClosed: true,
      isEditPrescriptionModalClosed: true,
    };

    this._editPatient = this._editPatient.bind(this);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._onEditAppointment = this._onEditAppointment.bind(this);
    this._onEdiSymptom = this._onEdiSymptom.bind(this);
    this._onEditPrescription = this._onEditPrescription.bind(this);
  }

  componentWillMount() {
    this.props.loadPatientById(this.props.params.id);
  }

  _editPatient() {
    this.context.router.push(`/admin/patients/${this.props.patient.id}/edit`);
  }

  _onEditAppointment(id) {
    this.setState({isListAppointmentModalClosed: true, isEditAppointmentModalClosed: false});
  }

  _onEditPrescription(id) {
    this.setState({isListPrescriptionModalClosed: true, isEditPrescriptionModalClosed: false});
  }

  _onEdiSymptom(id) {
    this.setState({isListSymptomModalClosed: true, isEditSymptomModalClosed: false});
  }

  _actionButtons(){
    switch(this.props.authRole){
      case role.ADMIN:
        return (<Button onClick={this._editPatient}>Edit</Button>);
      case role.DOCTOR:
        return (
          <div>
            <Button className="col-xs-12" onClick={() => this.setState({isAddAppointmentModalClosed: false})}>
              Add appointment
            </Button>
            <Button className="col-xs-12" onClick={() => this.setState({isListAppointmentModalClosed: false})}>
              View appointments
            </Button>
            <Button className="col-xs-12" onClick={() => this.setState({isAddSymptomModalClosed: false})}>
              Add symptom
            </Button>
            <Button className="col-xs-12" onClick={() => this.setState({isListSymptomModalClosed: false})}>
              View symptoms
            </Button>
            <Button className="col-xs-12" onClick={() => this.setState({isAddPrescriptionModalClosed: false})}>
              Add prescription
            </Button>
            <Button className="col-xs-12" onClick={() => this.setState({isListPrescriptionModalClosed: false})}>
              View prescriptions
            </Button>
          </div>);
      case role.NURSE:
        return (<Button onClick={() => this.setState({isUpdatePreliminaryModalClosed: false})}>Update preliminary checkup</Button>);
      default:
        return null;
    }
  }

  _modals() {
    switch(this.props.authRole){
      case role.ADMIN:
        return null;
      case role.DOCTOR:
        return (<div>
          <AddAppointment
            isModalClosed={this.state.isAddAppointmentModalClosed}
            closeModal={() => this.setState({isAddAppointmentModalClosed: true})}
            patientId={this.props.params.id} />
          <ListAppointment
            isModalClosed={this.state.isListAppointmentModalClosed}
            closeModal={() => this.setState({isListAppointmentModalClosed: true})}
            onEditAppointment={this._onEditAppointment} />
          <EditAppointment
            isModalClosed={this.state.isEditAppointmentModalClosed}
            closeModal={() => this.setState({isEditAppointmentModalClosed: true})} />
          <ListSymptom
            isModalClosed={this.state.isListSymptomModalClosed}
            closeModal={() => this.setState({isListSymptomModalClosed: true})}
            patientId={this.props.params.id}
            onEditSymptom={this._onEdiSymptom} />
          <AddSymptom
            isModalClosed={this.state.isAddSymptomModalClosed}
            closeModal={() => this.setState({isAddSymptomModalClosed: true})}
            patientId={this.props.params.id} />
          <EditSymptom
            isModalClosed={this.state.isEditSymptomModalClosed}
            closeModal={() => this.setState({isEditSymptomModalClosed: true})} />
          <AddPrescription
            isModalClosed={this.state.isAddPrescriptionModalClosed}
            closeModal={() => this.setState({isAddPrescriptionModalClosed: true})}
            patient={this.props.patient} />
          <ListPrescription
            isModalClosed={this.state.isListPrescriptionModalClosed}
            closeModal={() => this.setState({isListPrescriptionModalClosed: true})}
            onEditPrescription={this._onEditPrescription}
            patient={this.props.patient} />
          <EditPrescription
            isModalClosed={this.state.isEditPrescriptionModalClosed}
            closeModal={() => this.setState({isEditPrescriptionModalClosed: true})}
            patient={this.props.patient} />
        </div>);
      case role.NURSE:
        return (
          <UpdatePreliminary
            isModalClosed={this.state.isUpdatePreliminaryModalClosed}
            closeModal={() => this.setState({isUpdatePreliminaryModalClosed: true})}
            patient={this.props.patient}
          />
        );
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
    let modals = this._modals();
    if(this.props.fetching) return <FontAwesome className='fa-spinner fa-pulse' name='fa-spinner fa-pulse' size='2x' spin />;
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
            <td>{this.props.patient.idCardNo}</td>
            <td>{this.props.patient.firstName}</td>
            <td>{this.props.patient.lastName}</td>
            <td>{this.props.patient.email}</td>
            <td>{moment(this.props.patient.dob).format('YYYY/MM/DD').toString()}</td>
            <td>{this.props.patient.weight}</td>
            <td>{this.props.patient.height}</td>
            <td>{this.props.patient.bloodPressure || 'N/A'}</td>
            <td>{this.props.patient.phone}</td>
            <td>
              {actionButtons}
            </td>
          </tr>
          </tbody>
        </Table>
        {modals}
      </Col>
    );
  }
}

DetailPatient.contextTypes = {
  router: PropTypes.object,
};
DetailPatient.propTypes = {
  authRole: PropTypes.string,
  loadPatientById: PropTypes.func.isRequired,
  patient: PropTypes.object,
};
const mapStateToProps = (state) => ({
  authRole: state.auth.user.role.name,
  patient: state.patients.selectedPatient,
  fetching: state.patients.fetching,
});

const mapDispatchToProps = {
  loadPatientById
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailPatient);
