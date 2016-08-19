import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Http from 'helper/Http';
import { BackendUrl, role } from 'Config';
import Button from 'react-bootstrap/lib/Button';
import Table from 'react-bootstrap/lib/Table';
import Col from 'react-bootstrap/lib/Col';
import moment from 'moment';
export class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctor: {}
    };
    this._editDoctor = this._editDoctor.bind(this);
  }

  _editDoctor() {
    this.context.router.push(`/admin/doctors/${this.state.doctor.id}/edit`);
  }

  componentWillMount() {
    Http
      .get(`${BackendUrl}/doctors/${this.props.params.id}`)
      .then(({data}) => {
        this.setState({
          doctor: data
        });
      });

  }
  render() {
    return (
      <Col xs={12} sm={10} smOffset={1}>
        <Table responsive bsClass="table table-striped">
          <thead>
          <tr>
            <th>First Name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{this.state.doctor.firstName}</td>
            <td>{this.state.doctor.lastName}</td>
            <td>{this.state.doctor.email}</td>
            <td>{this.state.doctor.department ? this.state.doctor.department.name : ''}</td>
            <td>{this.state.doctor.position? this.state.doctor.position.name: ''}</td>
            <td>
              {
                this.props.user.role.name == role.ADMIN ?
                  <Button bsStyle="primary" onClick={this._editDoctor}>Edit</Button>
                  : null
              }

            </td>
          </tr>
          </tbody>
        </Table>
      </Col>
    );
  }
}

DetailDoctor.contextTypes = {
  router: PropTypes.object
};
DetailDoctor.propTypes = {
  user: PropTypes.object
};
const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(DetailDoctor);
