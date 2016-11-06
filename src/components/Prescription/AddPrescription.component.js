import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addPrescription } from './prescription.reducer';
import { notify } from 'components/Notification';
import SelectMedicine from 'components/SelectMedicine';
import SelectTimeToTake from 'components/SelectTimeToTake';
import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Checkbox from 'react-bootstrap/lib/Checkbox';
import Modal from 'react-bootstrap/lib/Modal';
import moment from 'moment';

export class AddPrescription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prescription: {
        patient: props.patient.id,
        doctor: props.doctor.id
      },
      medicinePrescription: [
        {
          medicine: 0,
          prescription: 0,
          timeToTake: 0,
          dosage: 1,
          amount: 1,
          remark: ''
        }
      ]
    }
    this._onSubmit = this._onSubmit.bind(this);
    this._onAddMedPres = this._onAddMedPres.bind(this);
    this._onMedicineChange = this._onMedicineChange.bind(this);
    this._onTimeToTakeChange = this._onTimeToTakeChange.bind(this);
    this._onRemoveMedPres = this._onRemoveMedPres.bind(this);
    this._onDosageChange = this._onDosageChange.bind(this);
    this._onAmountChange = this._onAmountChange.bind(this);
    this._onAmountStatus = this._onAmountStatus.bind(this);
    this._validate = this._validate.bind(this);
  }

  _onSubmit(e) {
    e.preventDefault();
    if(this._validate()){
      e.preventDefault();
      let prescription = this.state.prescription;
      let medicinePrescription = this.state.medicinePrescription;
      this.props.addPrescription(prescription,medicinePrescription);
      this.props.closeModal();
    }
  }
  _validate() {
    let isValid = true;
    let warningMessages = [];
    this.state.medicinePrescription.forEach((medPres,index) => {
      if(parseInt(medPres.medicine) < 1) {
        isValid = false;
        warningMessages = [...warningMessages, `Medicine #${index + 1} is required`];
      }
      if(parseInt(medPres.timeToTake) < 1) {
        isValid = false;
        warningMessages = [...warningMessages, `Medicine #${index + 1} requires Time to take`];
      }
      if(parseInt(medPres.dosage) < 1) {
        isValid = false;
        warningMessages = [...warningMessages, `Medicine #${index + 1} dosage must not be zero`];
      }
    });
    if(!isValid) {
      this.props.notify(warningMessages,'Warning!','warn');
    }
    return isValid;
  }
  _onMedicineChange(e, index) {
    let newMedPres = [...this.state.medicinePrescription];
    newMedPres[index].medicine = e ? e.value : 0;
    this.setState({medicinePrescription: newMedPres});
  }
  _onTimeToTakeChange(e, index) {
    let newMedPres = [...this.state.medicinePrescription];
    newMedPres[index].timeToTake = e ? e.value : 0;
    this.setState({medicinePrescription: newMedPres});
  }
  _onDosageChange(e, index) {
    let newMedPres = [...this.state.medicinePrescription];
    newMedPres[index].dosage = e ? e.target.value : 0;
    this.setState({medicinePrescription: newMedPres});
  }
  _onAmountChange(e, index) {
    let newMedPres = [...this.state.medicinePrescription];
    newMedPres[index].amount = e ? e.target.value : 0;
    this.setState({medicinePrescription: newMedPres});
  }
  _onAmountStatus(e, index) {
    console.log('amount status',e,index);
  }
  _onRemoveMedPres(index) {
    this.setState({medicinePrescription: this.state.medicinePrescription.filter((medPres,i) => i != index)})
  }
  _onAddMedPres() {
    this.setState({medicinePrescription:
      [
        ...this.state.medicinePrescription,
        {
          medicine: 0,
          prescription: 0,
          timeToTake: 0,
          dosage: 1,
          amount: 1,
          remark: ''
        }
      ]
    })
  }
  _onRemarkChange(e, index) {
    let newMedPres = [...this.state.medicinePrescription];
    newMedPres[index].remark = e ? e.target.value : 0;
    this.setState({medicinePrescription: newMedPres});
  }

  render() {
    let medPres = this.state.medicinePrescription.map((medPres,index) => {
      return (
        <div key={`medPresKey${index}`}>
          <Col xs={4} xsOffset={8} style={{marginBottom:'20px'}}>
            <Button bsStyle={`danger`}
                    className="pull-right"
                    onClick={() => {this._onRemoveMedPres(index)}}>
              Remove medicine
            </Button>
          </Col>
          <FormGroup controlId={`formHorizontalMedicinet${index}`}>
            <Col componentClass={ControlLabel} xs={3}>
              Medicine:
            </Col>
            <Col xs={9}>
              <SelectMedicine  onChange={(e) => this._onMedicineChange(e,index)}
                               value={medPres.medicine}/>
            </Col>
          </FormGroup>
          <FormGroup controlId={`formHorizontalTimeToTake${index}`}>
            <Col componentClass={ControlLabel} xs={3}  >
              Time to take:
            </Col>
            <Col xs={9}>
              <SelectTimeToTake onChange={(e) => this._onTimeToTakeChange(e,index)}
                                value={medPres.timeToTake} />
            </Col>
          </FormGroup>
          <FormGroup controlId={`formHorizontalDosage${index}`}>
            <Col componentClass={ControlLabel} xs={3}  >
              Dosage:
            </Col>
            <Col xs={9}>
              <FormControl type="number" placeholder="Dosage"
                           value={medPres.dosage}
                           min={0}
                           onChange={(e) => this._onDosageChange(e,index)} />
            </Col>
          </FormGroup>
          <FormGroup controlId={`formHorizontalAmount${index}`}>
            <Col componentClass={ControlLabel} xs={3}  >
              Amount:
            </Col>
            <Col xs={9}>
              <FormControl type="number" placeholder="Amount"
                           value={medPres.amount}
                           min={0}
                           onChange={(e) => this._onAmountChange(e,index)} />
            </Col>
            <Col componentClass={ControlLabel} xs={3}  >
              Amount is not a pill:
            </Col>
            <Col xs={9}>
              <Checkbox onChange={e => this._onAmountStatus(e,index)} />
            </Col>
          </FormGroup>
          <FormGroup controlId={`formHorizontalRemark${index}`}>
            <Col componentClass={ControlLabel} xs={3}  >
              Remark:
            </Col>
            <Col xs={9}>
              <textarea className="form-control"
                        placeholder="Remark"
                        value={medPres.remark}
                        onChange={(e) => this._onRemarkChange(e,index)} />
            </Col>
          </FormGroup>
          <hr />
        </div>
      )
    });
    return (
      <Modal show={!this.props.isModalClosed} onHide={() => {this.props.closeModal()}}>
        <Form horizontal role="form" onSubmit={this._onSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>{`Add prescription to patient: ${this.props.patient.firstName} ${this.props.patient.lastName}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {medPres}
            <Col xs={12}>
              <Button bsStyle="primary" className="pull-right" onClick={this._onAddMedPres}>More medicine</Button>
            </Col>
          </Modal.Body>
          <Modal.Footer style={{marginTop:'50px'}}>
            <Button bsStyle="danger" onClick={() => { this.props.closeModal() }}>Close</Button>
            <Button type="submit" bsStyle="primary">Add</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => ({
  doctor: state.auth.user
})

const mapDispatchToProps = {
  addPrescription,
  notify
}

AddPrescription.propTypes = {
  patient: PropTypes.object.isRequired,
  doctor: PropTypes.object.isRequired,
  isModalClosed: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPrescription);
