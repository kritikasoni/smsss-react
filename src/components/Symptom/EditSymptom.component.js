import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { editSymptom, deleteSymptom } from './symptom.reducer';
import SelectRoom from 'components/SelectRoom';
import TimePicker from 'components/TimePicker';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
import moment from 'moment';


export class EditSymptom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symptom: {
        patient: props.patient.id,
        detail: props.symptom.detail
      }
    }
    this._onSubmit = this._onSubmit.bind(this);
    this._onDetailChange = this._onDetailChange.bind(this);
    this._onDeleteSymptom = this._onDeleteSymptom.bind(this);
  }

  _onSubmit(e) {
    e.preventDefault();
    let symptom = this.state.symptom;
    this.props.editSymptom(this.props.symptom.id,symptom);
    this.props.closeModal();
  }

  _onDeleteSymptom() {
    this.props.deleteSymptom(this.props.symptom.id);
    this.props.closeModal();
  }

  _onDetailChange(e) {
    this.setState({symptom: {...this.state.symptom, detail: e.target.value}});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      symptom: {
        id: nextProps.symptom.id,
        patient: nextProps.patient.id,
        detail: nextProps.symptom.detail
      }
    })
  }

  render() {
    return (
      <Modal show={!this.props.isModalClosed} onHide={() => {this.props.closeModal()}}>
        <Modal.Header closeButton>
          <Modal.Title>
            {`Update symptom of patient: ${this.props.patient.firstName} ${this.props.patient.lastName}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{marginBottom:'30px'}}>
          <Button bsStyle={'danger'} className={`pull-right`} onClick={this._onDeleteSymptom}>Delete</Button>
          <Form horizontal onSubmit={this._onSubmit} role="form">
            <FormGroup controlId="formHorizontalRoom">
              <Col componentClass={ControlLabel} xs={2}>
                Detail :
              </Col>
              <Col xs={10}>
                <textarea className="form-control" value={this.state.symptom.detail} onChange={this._onDetailChange}>
                </textarea>
              </Col>
            </FormGroup>
            <hr />
            <Col xs={12} >
              <Button type="submit" bsStyle={'primary'} className={`pull-right`}>SUBMIT</Button>
            </Col>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{marginTop:'50px'}}>
          <Button bsStyle="danger" onClick={() => { this.props.closeModal() }}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => ({
  patient: state.patients.selectedPatient,
  symptom: state.symptoms.selectedSymptom
})


const mapDispatchToProps = {
  editSymptom,
  deleteSymptom
}

EditSymptom.propTypes = {
  symptom: PropTypes.object.isRequired,
  patient: PropTypes.object.isRequired,
  isModalClosed: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSymptom);

