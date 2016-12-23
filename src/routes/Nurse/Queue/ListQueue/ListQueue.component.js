import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import { notify } from 'components/Notification';
import { addQueue } from './../queue.reducer';
import Socket, { unsubscribe } from 'helper/Socket';
import Card from 'components/Card';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Col from 'react-bootstrap/lib/Col';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import SelectPatient from 'components/SelectPatient';
import moment from 'moment';
import TimePicker from 'components/TimePicker';
import styles from './ListQueue.component.scss';
import naturalSort from 'javascript-natural-sort';

export class ListQueue extends Component {
  constructor(props,context) {
    super(props,context);
    this.state =  {
      allRooms: [],
      rooms: [],
      showAddModal: false,
      showQueueDetailModal: false,
      showClearAllConfirmationModal: false,
      selectedRoom: { id: 0, name: '' },
      time: {
        hour:moment().get('hours'),
        minute:moment().get('minutes')
      },
      selectedPatientId: 0,
      queueDetail: {
        id: 0,
        patientId: 0,
        room: {
          id: 0,
          name: ''
        },
        status: '',
        time: '',
        currentIndex: undefined
      }
    };
    this.socket = null;
    this._deleteQueue = this._deleteQueue.bind(this);
    this._editQueue = this._editQueue.bind(this);
    this._manageQueue = this._manageQueue.bind(this);
    this._addQueue = this._addQueue.bind(this);
    this._openAddModal = this._openAddModal.bind(this);
    this._closeAddModal = this._closeAddModal.bind(this);
    this._onTimeHourChange = this._onTimeHourChange.bind(this);
    this._onTimeMinuteChange = this._onTimeMinuteChange.bind(this)
    this._onPatientChange = this._onPatientChange.bind(this);
    this._fetchQueueDetailByPatientId = this._fetchQueueDetailByPatientId.bind(this);
    this._closeQueueDetailModal = this._closeQueueDetailModal.bind(this);
    this._clearAllQueues = this._clearAllQueues.bind(this);
  }

  componentDidMount() {
    const self = this;
    Http.get(`${BackendUrl}/rooms`)
      .then(({data}) => {
        self.setState({rooms: data});
      })
      .catch(err => {
        throw err;
      });

    const initSocket = () => {
      self.socket = Socket();
      registerSocket();
    }
    const registerSocket = () => {
      console.log('this.socket', self.socket);
      self.socket.on('queues:created', function (queue) {
        console.log('created',queue);
        console.log(self.socket);
        self.socket.get(`/queues/allQueueInRoom/${queue.room.id}`, (body, JWR) => {
          console.log('body',body,'JWR',JWR);
          if(JWR.statusCode > 399){
            if(JWR.statusCode == 404){
              console.log('no queue in this room');
            }
            else{
              self.props.notify(body.message,'Warning!','warn');
            }
          }
          else{
            const roomIndex = self.state.allRooms.findIndex(room => room.id == body.id);
            let allRooms = [...self.state.allRooms];
            if(roomIndex > -1) {
              allRooms.splice(roomIndex,0,body);
            }
            else{
              allRooms.push(body);
            }
            allRooms.sort((room1,room2) => naturalSort(room1.name,room2.name));
            self.setState({allRooms: allRooms});
          }
        });
      });
      self.socket.on('queues:deleted', function (e) {
        console.log(e);
        let allRooms = [...self.state.allRooms];
        allRooms.map(room => {
          if(room.id == e.roomId){
            room.queues = room.queues.filter(q => {console.log(q); return q.id != e.id;});
            if(room.queues[0]){
              room.queues[0].status = 'CURRENT'; //TODO: remove hard code
            }
            return room;
          }
          return room;
        });
        self.setState({allRooms: allRooms});
      })
      self.socket.on('queues:clearAll', function (e) {
        console.log('queues:clearAll');
        let allRooms = [];
        self.setState({allRooms: allRooms});
      })

      self.socket.on('error', error => {
        console.error(error);
      });

      self.socket.get('/queues', (body, JWR) => {
        if(JWR.statusCode > 399){
          self.props.notify(body.message,'Warning!','warn');
        }
        else{
          self.setState({allRooms: body});
        }
      });
    }
    initSocket();
  }
  componentWillUnmount() {
    // this.socket = null;
  }

  _deleteQueue(roomId, queueId) {
    this.socket.delete(`/queues/${queueId}`, (body, JWR) => {
      let allRooms = [...this.state.allRooms];
      allRooms.map(room => {
        if(room.id == roomId){
          room.queues = room.queues.filter(q => q.id != queueId);
          return room;
        }
        return room;
      });
      this.setState({allRooms: allRooms});
    });
  }

  _editQueue(id) {
    this.context.router.push(`/nurse/queues/${id}/edit`);
  }

  //Manage queue by room id
  _manageQueue(id) {
    this.context.router.push(`/nurse/queues/room/${id}`);
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
      time: moment().set({'hour': this.state.time.hour,'minute': this.state.time.minute}).toISOString()
    };
    if(this._validateQueue()){
      this.props.addQueue(queue);
      this._closeAddModal();
    }
  }

  _validateQueue() {
    let isValid = true;
    let warningMessages = [];
    if(parseInt(this.state.selectedPatientId) < 1) {
      isValid = false;
      warningMessages = [...warningMessages, `Patient is required`];
    }
    if(!isValid) {
      this.props.notify(warningMessages,'Warning! validate failed','warn');
    }
    return isValid;
  }

  _onPatientChange(e) {
    this.setState({selectedPatientId: e ? e.value : 0});
  }

  _onTimeHourChange(e) {
    const time = {...this.state.time, hour: e.target.value};
    this.setState({time: time});
  }

  _onTimeMinuteChange(e) {
    const time = {...this.state.time, minute: e.target.value};
    this.setState({time: time});
  }

  _fetchQueueDetailByPatientId() {
    if(this.state.selectedPatientId > 0){
      this.setState({showQueueDetailModal: true})
      Http.get(`${BackendUrl}/queues/patient/${this.state.selectedPatientId}`)
        .then(({data}) => {
          console.log('queueDetail',data);
          this.setState({queueDetail: data});
        })
        .catch(err => {
          // this.props.notify(err.data.message,'Error!','error');
          console.error(err);
        });
    }
    else{
      this.props.notify('Please select patient before search!','Error!','error');
    }
  }
  _clearAllQueues() {
    Http.delete(`${BackendUrl}/queues/all`)
      .then((response) => {
        console.log('clear all');
        this.setState({showClearAllConfirmationModal: false});
        this.setState({allRooms: []});
      })
      .catch(err => {
        // this.props.notify(err.data.message,'Error!','error');
        console.error(err);
      });
  }
  _closeQueueDetailModal() {
    this.setState({showQueueDetailModal: false});
    this.setState({queueDetail: {
      id: 0,
      patientId: 0,
      room: {
        id: 0,
        name: ''
      },
      status: '',
      time: '',
      currentIndex: undefined
    }});
  }

  render() {
    let rooms = this.state.rooms.sort((roomA, roomB) => naturalSort(roomA.name, roomB.name)).map(room => {
      let queues = this.state.allRooms.find(queueRoom => (queueRoom.id == room.id));
      queues = queues ? queues.queues : [];
      queues = queues.map((queue, index) => {
        return (
          <div key={index}>
            <h2>No. {index + 1}</h2>
            <h3>Queue ID {queue.id}</h3>
            <h4>Time: {`${moment(queue.time).get('hours')}:${moment(queue.time).get('minutes')}`}</h4>
            <h4>Status: {queue.status}</h4>
            <Button onClick={() => this._editQueue(queue.id)}>Edit</Button>
            <Button onClick={() => this._deleteQueue(room.id,queue.id)}>Delete</Button>
          </div>
        );
      });
      return (
        <Card
          key={room.id}
          title={room.name}
          buttonName={`Manage queue`}
          onButtonClick={() => {
            this._manageQueue(room.id)
          }}
          cardStyle={`col-xs-12 col-sm-4`}
        >
          <div className="row">
            <div className="col-xs-12 col-sm-6">
              <h4>{queues.length > 0 ? 'First 3 queues' : 'No queue'}</h4>
            </div>
            <button className={`btn btn-primary col-xs-12 col-sm-6`} onClick={() => { this._openAddModal(room) }}>
              Add queue
            </button>
          </div>
          <div className={`row ${styles['card-queue']}`}>
            {queues.slice(0,3)}
          </div>
        </Card>
      );
    });
    const queueDetailModalBody = (<div>
      <h4>Patient</h4>
      <SelectPatient onChange={this._onPatientChange}
                     value={this.state.selectedPatientId} disabled={true}
      />
      <h1>Status: {this.state.queueDetail.status}</h1>
      <h2>Queue left: {this.state.queueDetail.currentIndex}</h2>
      <h3>Room name: {this.state.queueDetail.room.name}</h3>
      <h3>Time: {`${moment(this.state.queueDetail.time).get('hours')}:${moment(this.state.queueDetail.time).get('minutes')}`}</h3>
      <hr />
    </div>);
    return (
      <div>
        <h1>Queues</h1>
        <div className="row">
          <div className="col col-xs-12 col-sm-2 col-sm-offset-10">
            <Button className="pull-left" bsStyle="danger" onClick={() => {this.setState({showClearAllConfirmationModal: true})}}>
              Clear all queues
            </Button>
          </div>
        </div>
        <div className="col col-xs-12">
          <SelectPatient className="col col-md-4 col-md-offset-4" onChange={this._onPatientChange} value={this.state.selectedPatientId} />
          <Button className="pull-left" bsStyle="primary" onClick={() => {this._fetchQueueDetailByPatientId()}}>Search</Button>
        </div>
        <div className={`row container-fluid`}>
          {rooms}
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
            <hr />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => { this._closeAddModal() }} bsStyle="danger">Close</Button>
            <Button onClick={() => { this._addQueue() }} bsStyle="success">Add</Button>
          </Modal.Footer>
        </Modal>


        <Modal show={this.state.showQueueDetailModal} onHide={() => {this._closeQueueDetailModal();}}>
          <Modal.Header closeButton>
            <Modal.Title>Queue detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.queueDetail.id > 0 ? queueDetailModalBody : 'No queue found'}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => {this._closeQueueDetailModal();}} bsStyle={`danger`}>Close</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showClearAllConfirmationModal} onHide={() => {this.setState({showClearAllConfirmationModal: false})}}>
          <Modal.Header closeButton>
            <Modal.Title>Clear all queues in system confirm?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{height:'50px'}}>
              <div className="col col-xs-6">
                <Button bsStyle={`danger`} onClick={() => { this._clearAllQueues(); }}>
                  Confirm
                </Button>
              </div>
              <div className="col col-xs-6">
                <Button
                  onClick={() => {this.setState({showClearAllConfirmationModal: false})}}
                  bsStyle={`primary`} className="pull-right"
                >Close</Button>
              </div>
            </div>

          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
ListQueue.propTypes = {
  notify: PropTypes.func.isRequired
}
ListQueue.contextTypes = {
  router: PropTypes.object,
}
const mapDispatchToProps = {
  notify,
  addQueue
}
export default connect(null,mapDispatchToProps)(ListQueue);
