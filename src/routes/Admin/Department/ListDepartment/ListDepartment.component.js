import React, { Component } from 'react';
import axios from 'axios';
import Department from './Department.component';
import { BackendUrl } from 'Config';
import classes from './ListDepartment.component.scss';

export default class ListDepartment extends Component {
  constructor(props,context) {
    super(props,context);
    this.state =  {
      departments: []
    };
    this._deleteDepartment = this._deleteDepartment.bind(this);
    this._editDepartment = this._editDepartment.bind(this);
  }

  componentWillMount() {
    axios
      .get(`${BackendUrl}/departments`)
      .then(response => {
        this.setState({
          departments : response.data
        });
        console.log(this.state.departments);
      });
  }

  _deleteDepartment(id) {
    axios
      .delete(`${BackendUrl}/departments/`+id)
      .then(response => {
        let departments = this.state.departments.filter(department => department.id != id);
        this.setState({departments});
      })
      .catch(error => console.log);
  }
  _editDepartment(id) {
    this.context.router.push(`/departments/${id}`);
  }
  render() {
    let departments = this.state.departments.map((department) => {
      return (
        <div>
          <div className={classes.topic13}>

            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12 text-center">Department: {department.name}

                  <a href={`/admin/departments/${department.id}/edit`} >
                    <button type="button" className={`btn ${classes.editer2}`}>EDIT</button></a>
                  <button type="button" className={`btn ${classes.deleter2}`} onClick={() => this._deleteDepartment(department.id)}>DELETE</button>
                </div>

              </div>
            </div>
          </div>



        </div>
      );
    });
    return (
      <div>
        <div className={classes.namepage2}><h1>Departments</h1></div>
        {departments}
      </div>
    );
  }


}

