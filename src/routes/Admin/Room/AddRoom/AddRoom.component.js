import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addRoom } from './../room.reducer';
import classes from './AddRoom.component.scss';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';

export class AddRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:''
    };
    this._onSubmit = this._onSubmit.bind(this);
  }
  _onSubmit(e) {
    e.preventDefault();
    this.props.addRoom(this.state.name);
  }
  render() {

    return (
      <Form horizontal onSubmit={this._onSubmit} role="form">
        <h2>Add room</h2>
        <FormGroup controlId="formHorizontalRoomName">
          <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
            Room name :
          </Col>
          <Col xs={10} sm={3}>
            <FormControl type="text" placeholder="Room name"
                         value={this.state.name}
                         onChange={(e) => this.setState({name: e.target.value})}
            />
          </Col>
        </FormGroup>
        {
          this.props.fetching ?
            <i className="fa fa-spinner fa-spin fa-spinner" aria-hidden="true"></i> :
            <Button type="submit" className={`btn ${classes.submitbut4}`} >Submit</Button>
        }
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  fetching: state.departments.fetching
})
const mapDispatchToProps = {
  addRoom
}

export default connect(mapStateToProps,mapDispatchToProps)(AddRoom);
