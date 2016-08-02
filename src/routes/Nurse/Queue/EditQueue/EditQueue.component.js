import React, { Component } from 'react';
import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import moment from 'moment';
import TimePicker from 'components/TimePicker';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      patient: {},
      time: {
        hour:moment().get('hours'),
        minute:moment().get('minutes')
      },
      room: 0
    }
    ;
    this._onSubmit = this._onSubmit.bind(this);
    this._getRoomsOptions = this._getRoomsOptions.bind(this);
    this._onRoomChange = this._onRoomChange.bind(this);
  }
  _onSubmit(e) {
    e.preventDefault();
    console.log('submit');
    Http
      .put(`${BackendUrl}/queues/`+this.props.params.id,{
        patient: this.state.patient.id,
        detail: this.state.detail,
        time: moment().set({'hour' :self.state.time.hour,'minute': self.state.time.minute})
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      })
  }

  componentWillMount(){
    Http
      .get(`${BackendUrl}/queues/` + this.props.params.id)
      .then(({data}) => {
        const time = moment(data.time).format('HH:MM');
        const hour = time.split(":")[0];
        const minute = time.split(":")[1];
        this.setState({
          patient: data.patient,
          detail: data.detail,
          time: {
            hour: hour,
            minute: minute
          }
        });
      });
  }

  _getRoomsOptions(input, callback) {
    const toOptionFormat = (room) => ({
      label: `${room.name}`,
      value: room.id
    });
    if(input){
      Http.get(`${BackendUrl}/rooms`)
        .then(({data}) => {
          callback(null, {
            options: data.filter(room => room.name.includes(input)).map(room => toOptionFormat(room)),
            complete: false
          })
        })
        .catch(err => {
          throw err;
        });
    }
    else{
      Http.get(`${BackendUrl}/rooms`)
        .then(({data}) => {
          callback(null, {
            options: data.map(room => toOptionFormat(room)),
            complete: true
          })
        })
        .catch(err => {
          throw err;
        });
    }
  }

  _onRoomChange(e) {
    this.setState({room: e.value})
  }

  _onTimeHourChange(e) {
    this.setState({time: {hour: e.target.value}});
  }

  _onTimeMinuteChange(e) {
    this.setState({time: {minute: e.target.value}});
  }

  render() {
    return (
      <div className="row">
        <form role="form" onSubmit={this._onSubmit} className="col-xs-12 col-md-6 col-md-offset-3">
          <div className="row">
            <FormGroup className={`col-xs-12 col-sm-6`}>
              Patient:
              <FormControl
                type="text"
                name="patient"
                value={this.state.patient.firstName}
                disabled
                onChange={(e) => this.setState({patient: e.target.value})}
              />
            </FormGroup>
          </div>
          <FormGroup className={`col-xs-12 col-sm-6`}>
            Time:
            <TimePicker hour={this.state.time.hour} minute={this.state.time.minute}
                        onHourChange={this._onTimeHourChange} onMinuteChange={this._onTimeMinuteChange}
            />
          </FormGroup>


          <Select.Async
            name="room"
            loadOptions={this._getRoomsOptions}
            onChange={this._onRoomChange}
            value={this.state.room}
            placeHolder="Select room"
          />

          <button type="submit" >Submit</button>
        </form>
      </div>
    );
  }
}
