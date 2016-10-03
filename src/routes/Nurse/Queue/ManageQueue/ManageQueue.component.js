import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { notify } from 'components/Notification';
import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import SelectPatient from 'components/SelectPatient';
import SelectRoom from 'components/SelectRoom';
import { addQueue } from './../queue.reducer';
import Socket from 'helper/Socket';
import Card from 'components/Card';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import 'react-select/dist/react-select.css';
import moment from 'moment';
import TimePicker from 'components/TimePicker';

export class ManageQueue extends Component {
  constructor(props,context) {
    super(props,context);
    this.state =  {
      queues: [],
      rooms: [],
      showAddModal: false,
      selectedRoom: { id: 0, name: '' },
      time: {
        hour:moment().get('hours'),
        minute:moment().get('minutes')
      },
      selectedPatientId: 0
    };
    this.socket = null;
    this._deleteQueue = this._deleteQueue.bind(this);
    this._editQueue = this._editQueue.bind(this);
    this._viewQueue = this._viewQueue.bind(this);
    this._addQueue = this._addQueue.bind(this);
    this._openAddModal = this._openAddModal.bind(this);
    this._closeAddModal = this._closeAddModal.bind(this);
    this._onTimeHourChange = this._onTimeHourChange.bind(this);
    this._onTimeMinuteChange = this._onTimeMinuteChange.bind(this)
    this._onPatientChange = this._onPatientChange.bind(this);
  }

  componentWillMount() {
    const self = this;
    Http.get(`${BackendUrl}/rooms`)
      .then(({data}) => {
        this.setState({rooms: data});
      })
      .catch(err => {
        throw err;
      });
    this.socket = Socket();
    this.socket.on('queue', function(e){
      console.log(e);
      if(e.data){
        if(e.data.room.id == self.props.params.id){
          switch(e.verb){
            case 'created':
              self.setState({queues: [...self.state.queues, e.data ]})
              break;
            case 'updated':
              self.setState({
                queues: self.state.queues.map(q => (q.id == e.id ? e.data : q))
              });
              break;
            case 'destroyed':
              self.setState({queues: self.state.queues.filter(q => (q.id != e.id))});
              break;
            default:
              console.warn('Unrecognized socket event (`%s`) from server:',e.verb, e);
          }
        }
      }
    });
    this.socket.get(`/queues/searchByRoom/${this.props.params.id}`, (body, JWR) => {
      self.setState({queues: body});
    });

  }

  _deleteQueue(id) {
    Http
      .delete(`${BackendUrl}/queues/`+id)
      .then(response => {
        let queues = this.state.queues.filter(queue => queue.id != id);
        this.setState({queues});
      })
      .catch(error => console.log);
  }

  _editQueue(id) {
    this.context.router.push(`/queues/${id}`);
  }

  //View queue by room id
  //TODO: implement this
  _viewQueue(id) {
    this.context.router.push(`/queues/${id}`);
  }

  _openAddModal(room) {
    this.setState({
      showAddModal: true,
      selectedRoom: room,
      time: {
        hour:moment().get('hours'),
        minute:moment().get('minutes')
      }
    });
  }

  _closeAddModal() {
    this.setState({showAddModal: false, selectedRoom: {id:0, name: ''}});
  }

  _addQueue() {
    const queue =  {
      room: this.state.selectedRoom.id,
      patient: this.state.selectedPatientId,
      time: moment().set({'hour': this.state.time.hour,'minute': this.state.time.minute})
    };
    console.log(this._validateQueue());
    if(this._validateQueue()){
      this.props.addQueue(queue);
      this._closeAddModal();
    }
  }

  _validateQueue() {
    let isValid = true;
    let warningMessages = [];
    if(parseInt(this.state.selectedRoom.id) < 1) {
      isValid = false;
      warningMessages = [...warningMessages, `Room is required`];
    }
    if(parseInt(this.state.selectedPatientId) < 1) {
      isValid = false;
      warningMessages = [...warningMessages, `Patient is required`];
    }
    if(!isValid) {
      this.props.notify(warningMessages,'Warning!','warn');
    }
    return isValid;
  }

  _onPatientChange(e) {
    this.setState({selectedPatientId: e ? e.value : 0 });
  }

  _onTimeHourChange(e) {
    this.setState({time: {hour: e.target.value}});
  }
  _onTimeMinuteChange(e) {
    this.setState({time: {minute: e.target.value}});
  }

  render() {
    const room = this.state.rooms.filter(room => room.id == this.props.params.id).pop();
    const queues = this.state.queues.filter(queue => (queue.room.id == this.props.params.id))
      .map((queue, index) => {
        return (
          <div key={index}>
            <h2>No. {index + 1}</h2>
            <h4>Time: {`${moment(queue.time).get('hours')}:${moment(queue.time).get('minutes')}`}</h4>
            <h5>{`${queue.patient.firstName} ${queue.patient.lastName}`}</h5>
            <a href={`/nurse/queues/${queue.id}/edit`}><Button>Edit</Button></a>
            <Button onClick={() => this._deleteQueue(queue.id)}>Delete</Button>
          </div>
        );
      });
    return (
      <div>
        <h1>{`Queues of Room ${this.state.selectedRoom.name}`}</h1>
        <div className={`row container-fluid`}>
          <div className="row">
            <button className={`btn btn-primary col-xs-12 col-sm-4 col-sm-offset-4`} onClick={() => { this._openAddModal(room) }}>
              Add queue
            </button>
          </div>
          {queues}
        </div>
        <Modal show={this.state.showAddModal} onHide={() => {this._closeAddModal()}}>
          <Modal.Header closeButton>
            <Modal.Title>Add queue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Patient</h4>
            <SelectPatient onChange={this._onPatientChange}
                           value={this.state.selectedPatientId} />
            <h4>Room</h4>
            <input type="text" disabled="true" value={this.state.selectedRoom.name} />

            <h4>Time</h4>
            <TimePicker hour={this.state.time.hour + ''} minute={this.state.time.minute + ''}
                        onHourChange={this._onTimeHourChange} onMinuteChange={this._onTimeMinuteChange}
            />
            <hr />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this._closeAddModal}>Close</Button>
            <Button onClick={this._addQueue}>Add</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
ManageQueue.propTypes = {
  notify: PropTypes.func.isRequired
}
const mapDispatchToProps = {
  notify,
  addQueue
}
export default connect(null,mapDispatchToProps)(ManageQueue);
