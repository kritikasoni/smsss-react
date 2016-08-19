import React, { Component, PropTypes } from 'react';
import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import Socket from 'helper/Socket';
import Card from 'components/Card';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import moment from 'moment';
import TimePicker from 'components/TimePicker';

export default class ManageQueue extends Component {
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
        self.setState({rooms: data, selectedRoom: data.filter(room => room.id == self.props.params.id).pop()});
      })
      .catch(err => {
        throw err;
      });

    Socket.on('queue', function(e){
      console.log(e);
      if(e.data.room.id == this.props.params.id){
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
    });
    Socket.get(`/queues/searchByRoom/${this.props.params.id}`, (body, JWR) => {
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
    const self = this;
    Http
      .post(`${BackendUrl}/queues`,
        {
          room: self.state.selectedRoom.id,
          patient: self.state.selectedPatientId,
          time: moment().set({'hour' :self.state.time.hour,'minute': self.state.time.minute})
        }
      )
      .then(({data}) => {
        this._closeAddModal();
      });
  }

  _getPatientOptions(input, callback) {
    const toOptionFormat = (patient) => ({
      label: `${patient.idCardNo} ${patient.firstName} ${patient.lastName}`,
      value: patient.id,
      data: patient
    });
    if(input){
      Http.get(`${BackendUrl}/patients/search/idCardNo/${input}`)
        .then(({data}) => {
          callback(null, {
            options: data.map(patient => toOptionFormat(patient)),
            complete: false
          })
        })
        .catch(err => {
          throw err;
        });
    }
    else{
      Http.get(`${BackendUrl}/patients`)
        .then(({data}) => {
          callback(null, {
            options: data.map(patient => toOptionFormat(patient)),
            complete: true
          })
        })
        .catch(err => {
          throw err;
        });
    }
  }

  _onPatientChange(e) {
    this.setState({selectedPatientId: e.value});
    console.log(this.state.selectedPatientId);
  }

  _onTimeHourChange(e) {
    this.setState({time: {hour: e.target.value}});
  }
  _onTimeMinuteChange(e) {
    this.setState({time: {minute: e.target.value}});
  }

  render() {
    const room = this.state.rooms.filter(room => room.id == this.props.params.id).pop();
      const queues = this.state.queues.filter(queue => (queue.room.id == room.id))
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
            <Select.Async
              name="patient"
              loadOptions={this._getPatientOptions}
              onChange={this._onPatientChange}
              value={this.state.selectedPatientId}
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
            <Button onClick={() => { this._closeAddModal() }}>Close</Button>
            <Button onClick={() => { this._addQueue() }}>Add</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
