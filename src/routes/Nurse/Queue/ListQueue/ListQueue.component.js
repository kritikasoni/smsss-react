import React, { Component, PropTypes } from 'react';
import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import Socket from 'helper/Socket';
import Card from 'components/Card';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import TimePickerLocale from 'rc-time-picker/lib/locale/en_US';
import GregorianCalendar from 'gregorian-calendar';
import DateTimeFormat from 'gregorian-calendar-format';

//Time config
const showSecond = false;
const str = showSecond ? 'HH:mm:ss' : 'HH:mm';
const formatter = new DateTimeFormat(str);
const now = new GregorianCalendar(TimePickerLocale.calendar);
now.setTime(Date.now());

export default class ListQueue extends Component {
  constructor(props,context) {
    super(props,context);
    this.state =  {
      queues: [],
      rooms: [],
      showAddModal: false,
      selectedRoom: { id: 0, name: '' },
      time: null,
      selectedPatientId: 0
    };
    this._deleteQueue = this._deleteQueue.bind(this);
    this._editQueue = this._editQueue.bind(this);
    this._viewQueue = this._viewQueue.bind(this);
    this._addQueue = this._addQueue.bind(this);
    this._openAddModal = this._openAddModal.bind(this);
    this._closeAddModal = this._closeAddModal.bind(this);
    this._onTimeChange = this._onTimeChange.bind(this);
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

    Socket.get('/queues', (body, JWR) => {
      self.setState({queues: body});
      console.log(self.state.queues);
    });
    Socket.on('queue', (event) => {
      if(event.verb === 'created') {
        self.setState({queues: [...self.state.queues, event.data ]})
      }
      else if (event.verb === 'destroyed') {
        self.setState({queues: self.state.queues.map(q => q != event.data.id)})
      }
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
    this.setState({showAddModal: true, selectedRoom: room});
  }

  _closeAddModal() {
    this.setState({showAddModal: false, selectedRoom: {id:0, name: ''}});
  }

  _addQueue() {

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
    console.log(e);
    this.setState({selectedPatientId: e.value});
    console.log(this.state.selectedPatientId);
  }

  _onTimeChange(value) {
    console.log(value, formatter.format(value));
  }
  render() {
    let rooms = this.state.rooms.map(room => {
      let queues = this.state.queues.filter(queue => (queue.room.id == room.id))
        .map(queue => (
          <div>
            <h2>{queue.time}</h2>
            <h2>{queue.patient}</h2>
            <a href={`/nurse/queues/${queue.id}/edit`} ><button type="button">Edit</button></a>
            <button type="button" onClick={() => this._deleteQueue(queue.id)}>Delete</button>
          </div>
        ));
      return (
        <Card
          key={room.id}
          title={room.name}
          buttonName={`Manage queue`}
          onButtonClick={() => {
            this._viewQueue(room.id)
          }}>
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
            <Select.Async
              name="patient"
              loadOptions={this._getPatientOptions}
              onChange={this._onPatientChange}
              value={this.state.selectedPatientId}
            />

            <h4>Room</h4>
            <input type="text" disabled="true" value={this.state.selectedRoom.name} />

            <h4>Time</h4>
            <TimePicker
              formattter={formatter}
              style={{width: 100}}
              showSecond={showSecond}
              defaultValue={now}
              onChange={this._onTimeChange} />,
            <hr />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => { this._closeAddModal() }}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
