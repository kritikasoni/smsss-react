import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import { editDepartment, loadDepartmentById } from './../department.reducer';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import classes from './EditDepartment.component.scss';
export class EditDepartment extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      name:'',
    };
    this._onSubmit = this._onSubmit.bind(this);
  }
  _onSubmit(e) {
    e.preventDefault();
    this.props.editDepartment(this.props.params.id,this.state.name);
  }
  componentWillMount() {
    Http
      .get(`${BackendUrl}/departments/`+this.props.params.id)
      .then(({data}) => {
        this.setState({ name: data.name });
      });
  }
  render() {
    return (
      <Form horizontal onSubmit={this._onSubmit} role="form">
        <h2>Edit department</h2>
        <FormGroup controlId="formHorizontalDepartmentName">
          <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
            NAME :
          </Col>
          <Col xs={10} sm={3}>
            <FormControl type="text" placeholder="Department name"
                         value={this.state.name}
                         onChange={(e) => this.setState({name: e.target.value})}
            />
          </Col>
        </FormGroup>
        <Button type="submit" className={`btn`}>SUBMIT</Button>
      </Form>
    );
  }
}
EditDepartment.contextTypes = {
  store: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  fetching: state.departments.fetching
})
const mapDispatchToProps = {
  editDepartment
}

export default connect(mapStateToProps,mapDispatchToProps)(EditDepartment);

