import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { notify } from 'components/Notification';
import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import SelectPatient from 'components/SelectPatient';
import SelectRoom from 'components/SelectRoom';
import { addQueue } from './../queue.reducer';
import Socket, { unsubscribe } from 'helper/Socket';
import Card from 'components/Card';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import 'react-select/dist/react-select.css';
import moment from 'moment';
import TimePicker from 'components/TimePicker';
import styles from './ManageQueue.component.scss';

export class ManageQueue extends Component {
  constructor(props,context) {
    super(props,context);
    this.state =  {
      queueRoom: {id: -1, name: '', queues: []},
      rooms: [],
      showAddModal: false,
      selectedRoom: { id: 0, name: '' },
      time: {
        hour:moment().get('hours'),
        minute:moment().get('minutes')
      },
      selectedPatientId: 0,
      priority: 0,
      insertIndex: 1
    };
    this.socket = null;
    this._deleteQueue = this._deleteQueue.bind(this);
    this._editQueue = this._editQueue.bind(this);
    this._viewQueue = this._viewQueue.bind(this);
    this._addQueue = this._addQueue.bind(this);
    this._insertQueue = this._insertQueue.bind(this);
    this._openAddModal = this._openAddModal.bind(this);
    this._closeAddModal = this._closeAddModal.bind(this);
    this._onTimeHourChange = this._onTimeHourChange.bind(this);
    this._onTimeMinuteChange = this._onTimeMinuteChange.bind(this)
    this._onPatientChange = this._onPatientChange.bind(this);
    this._callQueue = this._callQueue.bind(this);
    this._clearAll = this._clearAll.bind(this);
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
    const currentRoomId = this.props.params.id;
    // this.socket.on('queues:created', function (queue) {
    //   console.log('created',queue);
    //   const currentRoomId = self.props.params.id;
    //   if(currentRoomId == queue.room.id){
    //     self.socket.get(`/queues/allQueueInRoom/${currentRoomId}`, (body, JWR) => {
    //       console.log('body',body,'JWR',JWR);
    //       if(JWR.statusCode > 399){
    //         self.props.notify(body.message,'Warning!','warn');
    //       }
    //       else{
    //         self.setState({queueRoom: body});
    //       }
    //     });
    //   }
    // });
    this.socket.get(`/queues/allQueueInRoom/${currentRoomId}`, (body, JWR) => {
      if(JWR.statusCode > 399){
        if(JWR.statusCode == 404){
          console.log('no queue in this room');
        }
        else{
          self.props.notify(body.message,'Warning!','warn');
        }
      }
      else{
        self.setState({queueRoom: body});
      }
    });
    this.socket.on('queues:moving', function (queue) {
      console.log('moving',queue);
      self.socket.get(`/queues/allQueueInRoom/${currentRoomId}`, (body, JWR) => {
        if (JWR.statusCode > 399) {
          self.props.notify(body.message, 'Warning!', 'warn');
        }
        else {
          self.setState({queueRoom: body});
        }
      });
    });
    // this.socket.on('queues:deleted', function (e) {
    //   console.log(e);
    //   let queueRoom = Object.assign({}, self.state.queueRoom);
    //   queueRoom.queues = queueRoom.queues.filter(q => {console.log(q); return q.patientId != e.patientId;});
    //   self.setState({queueRoom: queueRoom});
    // })
    // this.socket.get(`/queues/allQueueInRoom/${self.props.params.id}`, (body, JWR) => {
    //   if(JWR.statusCode > 399){
    //     self.props.notify(body.message,'Warning!','warn');
    //   }
    //   else{
    //     self.setState({queueRoom: body});
    //   }
    // });

  }
  componentWillUnmount() {
    this.socket = null;
  }

  _callQueue(){
    const self = this;
    this.socket.get(`/queues/callQueue/${self.props.params.id}`, (body, JWR) => {
      if(JWR.statusCode > 399){
        self.props.notify(body.message,'Warning!','warn');
      }
      else{
        self.props.notify(body.message,'Success!','success');
      }
    });
  }
  _insertQueue() {
    console.log('insert queue');
    const queue = {
      room: this.state.selectedRoom,
      patientId: this.state.selectedPatientId,
      time: moment().set({'hour': this.state.time.hour,'minute': this.state.time.minute}).toISOString(),
      priority: this.state.priority
    };
    Http
      .post(`${BackendUrl}/queues/insert/${this.state.insertIndex}`,queue)
      .then(response => {
        console.log('inserted');
      })
      .catch(error => {
        console.error(error);
      });
  }

  _deleteQueue(id) {
    console.log('delete queue id', id);
    Http
      .delete(`${BackendUrl}/queues/`+id)
      .then(response => {
        let queues = this.state.queueRoom.queues.filter(queue => queue.id != id);
        let queueRoom = Object.assign({}, this.state.queueRoom, {queues});
        this.setState({queueRoom});
        console.log('deleted queue id',id,response);
      })
      .catch(error => {
        console.error(error);
      });
  }

  _editQueue(id) {
    this.context.router.push(`/queues/${id}`);
  }

  _clearAll() {
    console.log('clear all queue in room', this.props.params.id);
    Http
      .delete(`${BackendUrl}/queues/room/${this.props.params.id}`)
      .then(response => {
        let queueRoom = Object.assign({}, this.state.queueRoom, {queues: []});
        this.setState({queueRoom});
        console.log('clear all');
      })
      .catch(error => {
        console.error(error);
      });
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
      room: this.state.selectedRoom,
      patientId: this.state.selectedPatientId,
      time: moment().set({'hour': this.state.time.hour,'minute': this.state.time.minute}).toISOString(),
      priority: this.state.priority
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
    const time = {...this.state.time, hour: e.target.value};
    this.setState({time: time});
  }

  _onTimeMinuteChange(e) {
    const time = {...this.state.time, minute: e.target.value};
    this.setState({time: time});
  }

  render() {
    const room = this.state.rooms.filter(room => room.id == this.props.params.id).pop();
    const queues = this.state.queueRoom.queues
      .map((queue, index) => {
        return (
          <div key={index}>
            <h2>No. {index + 1}</h2>
            <h3>Queue ID {queue.id}</h3>
            <h4>Time: {`${moment(queue.time).get('hours')}:${moment(queue.time).get('minutes')}`}</h4>
            <h4>Status: {queue.status}</h4>
            <a href={`/nurse/queues/${queue.id}/edit`}><Button>Edit</Button></a>
            <Button onClick={() => this._deleteQueue(queue.id)}>Delete</Button>
          </div>
        );
      });
    return (
      <div>
        <h1>{`Queues of ${this.state.queueRoom.name}`}</h1>
        <div className={`row container-fluid`}>
          <div className="row">
            <button className={`btn btn-success col-xs-12 col-sm-4 col-sm-offset-4`} onClick={() => { this._callQueue() }}>
              Call next queue
            </button>
            <button className={`btn btn-primary col-xs-12 col-sm-4 col-sm-offset-4 ${styles['add-queue-btn']}`} onClick={() => { this._openAddModal(room) }}>
              Add queue
            </button>
          </div>
          {queues}
          <button className={`btn btn-danger col-xs-12 col-sm-4 col-sm-offset-4 ${styles['delete-queue-btn']}`} onClick={() => { this._clearAll() }}>
            Clear all
          </button>
        </div>
        <Modal show={this.state.showAddModal} onHide={() => {this._closeAddModal()}}>
          <Modal.Header closeButton>
            <Modal.Title>Add queue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Patient</h4>
            <SelectPatient onChange={this._onPatientChange}
                           value={this.state.selectedPatientId}
                           dataSourceUrl={`${BackendUrl}/patients/search/idCardNo/notInQueue`}
                           dataSourceSearchUrl={`${BackendUrl}/patients/search/idCardNo/notInQueue`}
            />
            <h4>Room</h4>
            <input type="text" disabled="true" value={this.state.selectedRoom.name} />

            <h4>Time</h4>
            <TimePicker hour={this.state.time.hour + ''} minute={this.state.time.minute + ''}
                        onHourChange={this._onTimeHourChange} onMinuteChange={this._onTimeMinuteChange}
            />
            <FormGroup controlId="formHorizontalPriority">
              Insert as queue number :
              <FormControl type="number" placeholder="Queue number (index)"
                           step="1" min="1"
                           value={this.state.insertIndex}
                           onChange={(e) => this.setState({insertIndex: e.target.value})}
              />
            </FormGroup>
            <hr />
            <small>*Add will automatically insert according to priority</small>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this._closeAddModal} bsStyle="danger">Close</Button>
            <Button onClick={this._insertQueue} bsStyle="primary">Insert</Button>
            <Button onClick={this._addQueue} bsStyle="success">Add</Button>
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
