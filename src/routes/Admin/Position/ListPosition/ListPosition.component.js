import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadPosition, deletePosition, editPosition} from './../position.reducer';
import classes from './ListPosition.component.scss';
import Button from 'react-bootstrap/lib/Button';
import Table from 'react-bootstrap/lib/Table';
import Col from 'react-bootstrap/lib/Col';
import Modal from 'react-bootstrap/lib/Modal';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

export class ListPosition extends Component {
  constructor(props,context) {
    super(props,context);
    this.state =  {
      isModalClosed: true,
      selectedPosition: {
        id: 0,
        name: ''
      }
    };
    this._deletePosition = this._deletePosition.bind(this);
    this._editPosition = this._editPosition.bind(this);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._onEditPosition = this._onEditPosition.bind(this);
  }

  componentWillMount() {
    this.props.loadPosition();
  }

  _deletePosition(id) {
    this.props.deletePosition(id);
  }
  _editPosition(id) {
    const selectedPosition = this.props.positions.filter(position => position.id == id).pop();
    this.setState({selectedPosition: selectedPosition});
    this._openModal();
  }
  _onEditPosition(){
    this.props.editPosition(this.state.selectedPosition.id, this.state.selectedPosition.name);
    this._closeModal();
  }
  _openModal(){
    this.setState({isModalClosed: false});
  }
  _closeModal(){
    this.setState({isModalClosed: true});
  }
  render() {
    let positions = this.props.positions.map((position,index) => (
      <tr key={`position-row-${index+1}`}>
        <td>{index + 1}</td>
        <td>{position.name}</td>
        <td>
          <Button bsStyle="primary" onClick={() => this._editPosition(position.id)}>EDIT</Button>
          <Button className={classes['listPosition-btn__delete']} bsStyle="danger" onClick={() => this._deletePosition(position.id)}>
            DELETE
          </Button>
        </td>
        </tr>
    ));

    return (
      <Col xs={12} sm={10} smOffset={1}>
        <h2>Positions</h2>
        <Table responsive bsClass="table table-striped">
          <thead>
          <tr>
            <th>#</th>
            <th className="text-center">Name</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {positions}
          </tbody>
        </Table>
        <Modal show={!this.state.isModalClosed} onHide={() => {this._closeModal()}}>
          <Modal.Header closeButton>
            <Modal.Title>{`Update position: ${this.state.selectedPosition.name}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal role="form">
              <FormGroup controlId="formHorizontalPositionName">
                <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
                  NAME :
                </Col>
                <Col xs={10} sm={5}>
                  <FormControl type="text" placeholder="Position name"
                               value={this.state.selectedPosition.name}
                               onChange={(e) => this.setState(
                                 { selectedPosition: {...this.state.selectedPosition, name: e.target.value} }
                               )}
                  />
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={() => { this._closeModal() }}>Close</Button>
            <Button bsStyle="primary" onClick={this._onEditPosition}>Update</Button>
          </Modal.Footer>
        </Modal>
      </Col>
    );
  }
}
ListPosition.contextTypes = {
  router: PropTypes.any.isRequired
}
ListPosition.propTypes = {
  positions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.any,
    name: PropTypes.string
  })),
  loadPosition: PropTypes.func.isRequired,
  deletePosition: PropTypes.func.isRequired,
  editPosition: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  positions: state.positions.positions
})
const mapDispatchToProps = {
  loadPosition,
  deletePosition,
  editPosition
}
export default connect(mapStateToProps,mapDispatchToProps)(ListPosition);

