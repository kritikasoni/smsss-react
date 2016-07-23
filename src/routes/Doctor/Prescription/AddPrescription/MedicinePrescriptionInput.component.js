import React, { Component ,PropTypes } from 'react';
import Select from 'react-select';
import classes from './MedicinePrescriptionInput.component.scss';

export const MedicinePrescriptionInput = (props) => (
  <div>
    <div className={classes.topic8}>
      <br/>
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-6 text-right">MEDICINE :</div>
          <div className="col-md-3">
            <Select
              name="medicine"
              options={props.medicineOptions}
              value = {props.medicine}
              onChange={(id) => props.onMedicineChange(id)}
            /></div>
        </div>
      </div>

      <br />

      <div className="row">
        <div className="col-md-12">
          <div className="col-md-6 text-right">DOSAGE :</div>
          <div className="col-md-3">
            <Select
              name="dosage"
              options={props.dosageOptions}
              value = {props.dosage}
              onChange={(id) => props.onDosageChange(id)}
            />
          </div>
        </div>
      </div>
      <br />

      <div className="row">
        <div className="col-md-12">
          <div className="col-md-6 text-right">TIME TO TAKE :</div>
          <div className="col-md-3">
            <Select
              name="timeToTake"
              options={props.timeToTakeOptions}
              value = {props.timeToTake}
              onChange={(id) => props.onTimeToTakeChange(id)}
            />
          </div>
        </div>
      </div>
      <br />

      <div className="row">
        <div className="col-md-12">
          <div className="col-md-6 text-right">REMARK :</div>
          <div className="col-md-3">
        <textarea
          name="remark"
          onChange={(text) => props.onRemarkChange(text)}
          value={props.remark}
        >
        </textarea>
          </div>
        </div>
      </div>
    </div>


  </div>
)

MedicinePrescriptionInput.propTypes = {
  medicineOptions: PropTypes.array.isRequired,
  dosageOptions: PropTypes.array.isRequired,
  timeToTakeOptions: PropTypes.array.isRequired,
  medicine: PropTypes.number.isRequired,
  dosage: PropTypes.number.isRequired,
  timeToTake: PropTypes.number.isRequired,
  remark: PropTypes.string.isRequired,
  onMedicineChange: PropTypes.func.isRequired,
  onDosageChange: PropTypes.func.isRequired,
  onTimeToTakeChange: PropTypes.func.isRequired,
  onRemarkChange: PropTypes.func.isRequired
}

export default MedicinePrescriptionInput;
