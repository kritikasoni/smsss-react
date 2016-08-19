import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadDepartment, deleteDepartment } from './../department.reducer';
import Department from './Department.component';
import { BackendUrl } from 'Config';
import classes from './ListDepartment.component.scss';
import Button from 'react-bootstrap/lib/Button';

export class ListDepartment extends Component {
  constructor(props,context) {
    super(props,context);
    this._editDepartment = this._editDepartment.bind(this);
  }

  componentWillMount() {
    this.props.loadDepartment();
  }

  _deleteDepartment(id) {
    console.log(id);
    this.props.deleteDepartment(id);
  }

  _editDepartment(id) {
    this.context.router.push(`/admin/departments/${id}/edit`);
  }
  render() {
    let departments = this.props.departments.map((department) => {
      return (
        <div className="row" key={department.id}>
          <div className="col-md-12">
            <Department name={department.name}>
                <Button bsStyle="primary" onClick={() => this._editDepartment(department.id)}>EDIT</Button>
              <button
                type="button"
                className={`btn ${classes.deleter}`}
                onClick={() => this._deleteDepartment(department.id)}
              >
                DELETE
              </button>
            </Department>
          </div>
        </div>
      );
    });
    return (
      <div>
       <h1>Departments</h1>
        {departments}
      </div>
    );
  }
}
ListDepartment.contextTypes = {
  router: PropTypes.any.isRequired
}
ListDepartment.propTypes = {
  departments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.string
  }))
}

const mapStateToProps = (state) => ({
  departments: state.departments.departments
})
const mapDispatchToProps = {
  loadDepartment,
  deleteDepartment
}
export default connect(mapStateToProps,mapDispatchToProps)(ListDepartment);
