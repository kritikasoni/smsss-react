import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadPatient, deletePatient } from './../patient.reducer';
import Patient from './Patient.component';
import { BackendUrl } from 'Config';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import SelectPatient from 'components/SelectPatient';
import classes from './ListPatient.component.scss';
import Col from 'react-bootstrap/lib/Col';

export class ListPatient extends Component {
  constructor(props,context) {
    super(props,context);
    this.state =  {
      selectedPatientId: 0
    };
    this._deletePatient = this._deletePatient.bind(this);
    this._editPatient = this._editPatient.bind(this);
    this._onViewPatient = this._onViewPatient.bind(this);
    this._onPatientChange = this._onPatientChange.bind(this);

  }

  componentWillMount() {
    this.props.loadPatient();
  }

  _deletePatient(id) {
    this.props.deletePatient(id);
  }

  _editPatient(id) {
    this.context.router.push(`/admin/patients/${id}/edit`);
  }

  _onPatientChange(e) {
    this.setState({selectedPatientId: e ? e.value : 0});
  }

  _onViewPatient(id){
    this.context.router.push(`/admin/patients/${id}/detail`);
  }

  render() {
    let patients = this.props.patients
      .filter(patient => {
        if(this.state.selectedPatientId > 0){
          return patient.id == this.state.selectedPatientId
        }
        else return patient;
      })
      .map((patient,index) => {
      return (
        <Patient key={ index } {...patient} patientId={patient.id} handleOnClick={this._onViewPatient}/>
      );
    });
    return (
      <div>
        <div><h1>Patients</h1></div>
        <div className={'row'}>
          <Col xs={12} sm={4} smOffset={4} >
            <SelectPatient onChange={this._onPatientChange} value={this.state.selectedPatientId} />
          </Col>
        </div>
        <div className={'row'}>
          {patients}
        </div>
      </div>
    );
  }
}

ListPatient.contextTypes = {
  router: PropTypes.any.isRequired
}
ListPatient.propTypes = {
  patients: PropTypes.array.isRequired,
  loadPatient: PropTypes.func.isRequired,
  deletePatient: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  patients: state.patients.patients
})
const mapDispatchToProps = {
  loadPatient,
  deletePatient
}
export default connect(mapStateToProps,mapDispatchToProps)(ListPatient);
