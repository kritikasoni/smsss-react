import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import { notify } from 'components/Notification';
import { addQueue } from './../queue.reducer';
import Socket from 'helper/Socket';
import Card from 'components/Card';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import SelectPatient from 'components/SelectPatient';
import moment from 'moment';
import TimePicker from 'components/TimePicker';

export default class ListQueue extends Component {
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
    this._deleteQueue = this._deleteQueue.bind(this);
    this._editQueue = this._editQueue.bind(this);
    this._manageQueue = this._manageQueue.bind(this);
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
        self.setState({rooms: data});
      })
      .catch(err => {
        throw err;
      });

    Socket.on('queue', function(e){
      console.log(e);
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
    });
    Socket.get('/queues', (body, JWR) => {
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
      room: this.state.selectedRoom.id,
      patient: this.state.selectedPatientId,
      time: moment().set({'hour': this.state.time.hour,'minute': this.state.time.minute})
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
      this.props.notify(warningMessages,'Warning!','warn');
    }
    return isValid;
  }

  _onPatientChange(e) {
    this.setState({selectedPatientId: e ? e.value : 0});
  }

  _onTimeHourChange(e) {
    this.setState({time: {hour: e.target.value}});
  }
  _onTimeMinuteChange(e) {
    this.setState({time: {minute: e.target.value}});
  }

  render() {
    let rooms = this.state.rooms.map(room => {
      const queues = this.state.queues.filter(queue => (queue.room.id == room.id))
        .map((queue, index) => {
          return (
            <div key={index}>
              <h2>No. {index + 1}</h2>
              <h4>Time: {`${moment(queue.time).get('hours')}:${moment(queue.time).get('minutes')}`}</h4>
              <h5>{`${queue.patient.firstName} ${queue.patient.lastName}`}</h5>
              <Button onClick={() => this._editQueue(queue.id)}>Edit</Button>
              <Button onClick={() => this._deleteQueue(queue.id)}>Delete</Button>
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
          {queues.slice(0,3)}
        </Card>
      );
    });

    return (
      <div>
        <h1>Queues</h1>
        <div className={`row container-fluid`}>
          {rooms}
        </div>
        <Modal show={this.state.showAddModal} onHide={() => {this._closeAddModal()}}>
          <Modal.Header closeButton>
            <Modal.Title>Add queue</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Patient</h4>
            <SelectPatient onChange={this._onPatientChange} value={this.state.selectedPatientId} />
            <h4>Room</h4>
            <input type="text" disabled="true" value={this.state.selectedRoom.name} />

            <h4>Time</h4>
            <TimePicker hour={this.state.time.hour + ''} minute={this.state.time.minute + ''}
                        onHourChange={this._onTimeHourChange} onMinuteChange={this._onTimeMinuteChange}
            />
            <hr />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => { this._closeAddModal() }}>Close</Button>
            <Button onClick={() => { this._addQueue() }}>Add</Button>
          </Modal.Footer>
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
