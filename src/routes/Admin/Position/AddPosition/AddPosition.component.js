import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addPosition } from './../position.reducer';
import classes from './AddPosition.component.scss';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';

export class AddPosition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:''
    };
    this._onSubmit = this._onSubmit.bind(this);
  }
  _onSubmit(e) {
    e.preventDefault();
    this.props.addPosition(this.state.name);
  }

  render() {
    return (
      <Form horizontal onSubmit={this._onSubmit} role="form">
        <h2>Add position</h2>
        <FormGroup controlId="formHorizontalPositionName">
          <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
             NAME :
          </Col>
          <Col xs={10} sm={3}>
            <FormControl type="text" placeholder="Position name"
                         value={this.state.name}
                         onChange={(e) => this.setState({name: e.target.value})}
            />
          </Col>
        </FormGroup>
        {
          this.props.fetching ?
            <i className="fa fa-spinner fa-spin fa-spinner" aria-hidden="true"></i> :
            <Button type="submit">SUBMIT</Button>
        }
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  fetching: state.departments.fetching
})
const mapDispatchToProps = {
  addPosition
}

export default connect(mapStateToProps,mapDispatchToProps)(AddPosition);
