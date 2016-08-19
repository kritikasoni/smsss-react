import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadDoctor, deleteDoctor } from './../doctor.reducer';
import Button from 'react-bootstrap/lib/Button';
import classes from './ListDoctor.component.scss';
import Table from 'react-bootstrap/lib/Table';
import Col from 'react-bootstrap/lib/Col';
import Doctor from './Doctor.component';
import SelectDoctor from 'components/SelectDoctor';

export class ListDoctor extends Component {
  constructor(props,context) {
    super(props,context);
    this.state =  {
      selectedDoctorId: 0
    };
    this._deleteDoctor = this._deleteDoctor.bind(this);
    this._editDoctor = this._editDoctor.bind(this);
    this._onDoctorChange = this._onDoctorChange.bind(this);
  }
  componentWillMount(){
    this.props.loadDoctor();
  }

  _onDoctorChange(e){
    this.setState({selectedDoctorId: e ? e.value : 0});
  }

  _deleteDoctor(id) {
    this.props.deleteDoctor(id);
  }
  _editDoctor(id) {
    this.context.router.push(`/admin/doctors/${id}/edit`);
  }
  _viewDoctor(id) {
    this.context.router.push(`/admin/doctors/${id}/detail`);
  }
  render() {
    let doctors = this.props.doctors
      .filter(doctor => {
        if(this.state.selectedDoctorId > 0){
          return doctor.id == this.state.selectedDoctorId
        }
        else return doctor;
      })
      .map((doctor,index) => {
      return (
        <Doctor key={index}
                firstName={doctor.firstName}
                lastName={doctor.lastName}
                department={doctor.department.name}
                position={doctor.position.name}
                handleOnDelete={() => this._deleteDoctor(doctor.id)}
                handleOnEdit={() => this._editDoctor(doctor.id)}
                handleOnView={() => this._viewDoctor(doctor.id)} />
      );
    });
    return (
      <Col xs={12} sm={10} smOffset={1}>
        <Col xs={12} sm={6} smOffset={3}>
          <SelectDoctor onChange={this._onDoctorChange} value={this.state.selectedDoctorId}/>
        </Col>
        <Table responsive bsClass="table table-striped" className={classes['listDoctor-table__spaceUp']}>
          <thead>
          <tr>
            <th>First Name</th>
            <th>Last name</th>
            <th>Department</th>
            <th>Position</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {doctors}
          </tbody>
        </Table>
      </Col>
    );
  }
}
ListDoctor.contextTypes = {
  router: PropTypes.any.isRequired
}
ListDoctor.propTypes = {
  doctors: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  doctors: state.doctors.doctors
})
const mapDispatchToProps = {
  loadDoctor,
  deleteDoctor
}
export default connect(mapStateToProps,mapDispatchToProps)(ListDoctor);
