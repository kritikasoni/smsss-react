import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import Button from 'react-bootstrap/lib/Button';
import Table from 'react-bootstrap/lib/Table';
import Col from 'react-bootstrap/lib/Col';
import moment from 'moment';
export class DetailNurse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nurse: {}
    };

    this._editNurse = this._editNurse.bind(this);
  }

  _editNurse() {
    this.context.router.push(`/admin/nurses/${this.state.nurse.id}/edit`);
  }

  componentWillMount() {
    Http
      .get(`${BackendUrl}/nurses/${this.props.params.id}`)
      .then(({data}) => {
        this.setState({
          nurse: data
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
            <td>{this.state.nurse.firstName}</td>
            <td>{this.state.nurse.lastName}</td>
            <td>{this.state.nurse.email}</td>
            <td>{this.state.nurse.department ? this.state.nurse.department.name : ''}</td>
            <td>{this.state.nurse.position? this.state.nurse.position.name: ''}</td>
            <td>
              <Button bsStyle="primary">Edit</Button>
            </td>
          </tr>
          </tbody>
        </Table>
      </Col>
    );
  }
}

DetailNurse.contextTypes = {
  router: PropTypes.object
};
DetailNurse.propTypes = {
  user: PropTypes.object
};
const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(DetailNurse);
