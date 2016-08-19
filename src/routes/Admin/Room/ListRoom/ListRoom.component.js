import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadRoom, deleteRoom, editRoom} from './../room.reducer';
import classes from './ListRoom.component.scss';
import Button from 'react-bootstrap/lib/Button';
import Table from 'react-bootstrap/lib/Table';
import Col from 'react-bootstrap/lib/Col';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

export class ListRoom extends Component {
  constructor(props,context) {
    super(props,context);
    this.state =  {
      isModalClosed: true,
      selectedRoom: {
        id: 0,
        name: ''
      }
    };
    this._deleteRoom = this._deleteRoom.bind(this);
    this._editRoom = this._editRoom.bind(this);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._onEditRoom = this._onEditRoom.bind(this);
  }

  componentWillMount() {
    this.props.loadRoom();
  }

  _deleteRoom(id) {
   this.props.deleteRoom(id);
  }
  _editRoom(id) {
    const selectedRoom = this.props.rooms.filter(room => room.id == id).pop();
    this.setState({selectedRoom: selectedRoom});
    this._openModal();
  }
  _onEditRoom(){
    this.props.editRoom(this.state.selectedRoom.id, this.state.selectedRoom.name);
    this._closeModal();
  }
  _openModal(){
    this.setState({isModalClosed: false});
  }
  _closeModal(){
    this.setState({isModalClosed: true});
  }
  render() {
    let rooms = this.props.rooms.map((room,index) => (
      <tr key={`room-row-${index+1}`}>
        <td>{index + 1}</td>
        <td>{room.name}</td>
        <td>
          <Button bsStyle="primary" onClick={() => this._editRoom(room.id)}>EDIT</Button>
          <Button className={classes['listRoom-btn__delete']} bsStyle="danger" onClick={() => this._deleteRoom(room.id)}>
            DELETE
          </Button>
        </td>
      </tr>
    ));

    return (
      <Col xs={12} sm={10} smOffset={1}>
        <h2>Rooms</h2>
        <Table responsive bsClass="table table-striped">
          <thead>
          <tr>
            <th>#</th>
            <th className="text-center">Name</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {rooms}
          </tbody>
        </Table>
        <Modal show={!this.state.isModalClosed} onHide={() => {this._closeModal()}}>
          <Modal.Header closeButton>
            <Modal.Title>{`Update room: ${this.state.selectedRoom.name}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal role="form">
              <FormGroup controlId="formHorizontalRoomName">
                <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
                  NAME :
                </Col>
                <Col xs={10} sm={5}>
                  <FormControl type="text" placeholder="Room name"
                               value={this.state.selectedRoom.name}
                               onChange={(e) => this.setState(
                                 { selectedRoom: {...this.state.selectedRoom, name: e.target.value} }
                               )}
                  />
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={() => { this._closeModal() }}>Close</Button>
            <Button bsStyle="primary" onClick={this._onEditRoom}>Update</Button>
          </Modal.Footer>
        </Modal>
      </Col>
    );
  }
}

ListRoom.contextTypes = {
  router: PropTypes.any.isRequired
}
ListRoom.propTypes = {
  rooms: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.string
  })),
  loadRoom: PropTypes.func.isRequired,
  deleteRoom: PropTypes.func.isRequired,
  editRoom: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  rooms: state.rooms.rooms
})
const mapDispatchToProps = {
  loadRoom,
  deleteRoom,
  editRoom
}
export default connect(mapStateToProps,mapDispatchToProps)(ListRoom);


