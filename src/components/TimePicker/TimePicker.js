import React, { PropTypes } from 'react';
import classes from './TimePicker.scss';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import FormControl from 'react-bootstrap/lib/FormControl';
const TimePicker = (props) => (
  <div>
    <FormGroup className={`col-xs-12 col-sm-6`}>
      <FormControl
        type="number"
        placeholder="Hour"
        min={0} max={23} step={1}
        value={props.hour}
        onChange={props.onHourChange}
      />
    </FormGroup>
    <FormGroup className={`col-xs-12 col-sm-6`}>
      <FormControl
        type="number"
        placeholder="Minute"
        min={0} max={59} step={1}
        value={props.minute}
        onChange={props.onMinuteChange}
      />
    </FormGroup>
  </div>
)
TimePicker.propTypes = {
  hour: PropTypes.string.isRequired,
  minute: PropTypes.string.isRequired,
  onHourChange: PropTypes.func.isRequired,
  onMinuteChange: PropTypes.func.isRequired
}
export default TimePicker;
