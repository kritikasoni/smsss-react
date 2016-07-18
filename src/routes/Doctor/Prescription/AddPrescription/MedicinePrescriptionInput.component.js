import React, { Component ,PropTypes } from 'react';
import Select from 'react-select';
import classes from './MedicinePrescriptionInput.component.scss';

export const MedicinePrescriptionInput = (props) => (
  <div>
    Medicine:
    <Select
      name="medicine"
      options={props.medicineOptions}
      value = {props.medicine}
      onChange={(id) => props.onMedicineChange(id)}
    />
    <br />
    Dosage:
    <Select
      name="dosage"
      options={props.dosageOptions}
      value = {props.dosage}
      onChange={(id) => props.onDosageChange(id)}
    />
    <br />
    Time to take:
    <Select
      name="timeToTake"
      options={props.timeToTakeOptions}
      value = {props.timeToTake}
      onChange={(id) => props.onTimeToTakeChange(id)}
    />
    <br />
    Remark:
        <textarea
          name="remark"
          onChange={(text) => props.onRemarkChange(text)}
          value={props.remark}
        >
        </textarea>
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
