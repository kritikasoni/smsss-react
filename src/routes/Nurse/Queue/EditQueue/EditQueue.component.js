import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { editQueue } from './../queue.reducer';
import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import { notify } from 'components/Notification';
import Button from 'react-bootstrap/lib/Button';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
import moment from 'moment';
import TimePicker from 'components/TimePicker';
import SelectRoom from 'components/SelectRoom';

export class EditQueue extends Component {
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
    this._onRoomChange = this._onRoomChange.bind(this);
    this._onTimeHourChange = this._onTimeHourChange.bind(this);
    this._onTimeMinuteChange = this._onTimeMinuteChange.bind(this);
  }
  _onSubmit(e) {
    e.preventDefault();
    if(this._validate()){
      const queue = {
        patient: this.state.patient.id,
        room: this.state.room,
        time: moment().set({'hour': this.state.time.hour, 'minute': this.state.time.minute})
      }
      this.props.editQueue(this.props.params.id, queue);
    }
  }

  _validate() {
    let isValid = true;
    let warningMessages = [];
    if(parseInt(this.state.room) < 1) {
      isValid = false;
      warningMessages = [...warningMessages, `Room is required`];
    }
    if(!isValid) {
      this.props.notify(warningMessages,'Warning!','warn');
    }
    return isValid;
  }

  componentWillMount(){
    Http
      .get(`${BackendUrl}/queues/` + this.props.params.id)
      .then(({data}) => {
        const time = moment(data.time);
        const hour = time.get('hours');
        const minute = time.get('minutes');
        this.setState({
          patient: data.patient,
          room: data.room.id,
          time: {
            hour: hour,
            minute: minute
          }
        });
      });
  }

  _onRoomChange(e) {
    this.setState({room: e ? e.value : 0})
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
    return (
      <div className="row">
        <form role="form" onSubmit={this._onSubmit} className="col-xs-12 col-md-6 col-md-offset-3">
          <div className="row">
            <FormGroup className={`col-xs-12 col-sm-6 col-sm-offset-3`}>
              Patient:
              <FormControl
                type="text"
                name="patient"
                value={`${this.state.patient.firstName} ${this.state.patient.lastName}`}
                disabled={true}
              />
            </FormGroup>
          </div>
          <div>
            Room:
            <SelectRoom onChange={this._onRoomChange} value={this.state.room} />
          </div>
          <div>
            Time:
            <TimePicker hour={this.state.time.hour + ''} minute={this.state.time.minute + ''}
                        onHourChange={this._onTimeHourChange} onMinuteChange={this._onTimeMinuteChange}
            />
          </div>
          <Button bsStyle={'primary'} type="submit" >Submit</Button>
        </form>
      </div>
    );
  }
}

EditQueue.propTypes = {
  notify: PropTypes.func.isRequired,
  editQueue: PropTypes.func.isRequired
}
const mapDispatchToProps = {
  notify,
  editQueue
}
export default connect(null, mapDispatchToProps)(EditQueue);
