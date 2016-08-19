import React, { Component, PropTypes } from 'react';
import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import Button from 'react-bootstrap/lib/Button';
import classes from './ListNurse.component.scss';
import Table from 'react-bootstrap/lib/Table';
import Col from 'react-bootstrap/lib/Col';
import Nurse from './Nurse.component';
import SelectNurse from 'components/SelectNurse';
export default class ListNurse extends Component {
  constructor(props,context) {
    super(props,context);
    this.state =  {
      nurses: [],
      selectedNurseId: 0
    };
    this._deleteNurse = this._deleteNurse.bind(this);
    this._editNurse = this._editNurse.bind(this);
    this._viewNurse = this._viewNurse.bind(this);
    this._onNurseChange = this._onNurseChange.bind(this);
  }

  componentWillMount() {
    Http
      .get(`${BackendUrl}/nurses`)
      .then(response => {
        this.setState({
          nurses : response.data
        });
      });
  }

  _deleteNurse(id) {
    Http
      .delete(`${BackendUrl}/nurses/`+id)
      .then(response => {
        let nurses = this.state.nurses.filter(nurse => nurse.id != id);
        this.setState({nurses});
      })
      .catch(error => console.log);
  }
  _editNurse(id) {
    this.context.router.push(`admin/nurses/${id}/edit`);
  }
  _viewNurse(id) {
    this.context.router.push(`admin/nurses/${id}/detail`);
  }
  _onNurseChange(e){
    this.setState({selectedNurseId: e ? e.value : 0});
  }
  render() {
    let nurses = this.state.nurses
      .filter(nurse => {
        if(this.state.selectedMedicineId > 0){
          return nurse.id == this.state.selectedMedicineId
        }
        else return nurse;
      })
      .map((nurse,index) => {
      return (
        <Nurse key={index}
                firstName={nurse.firstName}
                lastName={nurse.lastName}
                department={nurse.department.name}
                position={nurse.position.name}
                handleOnDelete={() => this._deleteNurse(nurse.id)}
                handleOnEdit={() => this._editNurse(nurse.id)}
                handleOnView={() => this._viewNurse(nurse.id)} />
      );
    });
    return (
      <Col xs={12} sm={10} smOffset={1}>
        <Col xs={12} sm={6} smOffset={3}>
          <SelectNurse onChange={this._onNurseChange} value={this.state.selectedNurseId}/>
        </Col>
        <Table responsive bsClass="table table-striped" className={classes['listNurse-table__spaceUp']}>
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
          {nurses}
          </tbody>
        </Table>
      </Col>
    );
  }
}
ListNurse.contextTypes = {
  router: PropTypes.any.isRequired
}

