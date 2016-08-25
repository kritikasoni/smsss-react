import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadSymptom, selectSymptom } from './symptom.reducer';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import moment from 'moment';
export class ListSymptom extends Component {
  constructor(props,context) {
    super(props,context);
  }

  componentWillMount() {
    this.props.loadSymptom(this.props.patientId);
  }

  _editSymptom(id) {
    this.props.selectSymptom(id);
    this.props.onEditSymptom(id);
  }

  render() {
    let symptoms = this.props.symptoms.map((symptom) => {
      return (
        <div key={symptom.id} style={{paddingLeft:'10px'}}>
          <p>Date time: {moment(symptom.createdAt).format('YYYY/MM/DD HH:mm').toString()}</p>
          <p>Detail: {symptom.detail}</p>
         <Col xs={4} xsOffset={8}>
           <Button bsStyle={'primary'} className="col-xs-12" onClick={() => this._editSymptom(symptom.id)}>
             Edit
           </Button>
         </Col>
        </div>
      );
    });
    return (
      <Modal show={!this.props.isModalClosed} onHide={() => {this.props.closeModal()}}>
        <Modal.Header closeButton>
          <Modal.Title>
            {`Symptom history of patient: ${this.props.patient.firstName} ${this.props.patient.lastName}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{marginBottom:'30px'}}>
          {symptoms}
        </Modal.Body>
        <Modal.Footer style={{marginTop:'50px'}}>
          <Button bsStyle="danger" onClick={() => { this.props.closeModal() }}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ListSymptom.propTypes = {
  patient: PropTypes.object.isRequired,
  symptoms: PropTypes.array.isRequired,
  loadSymptom: PropTypes.func.isRequired,
  selectSymptom: PropTypes.func.isRequired,
  isModalClosed: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onEditSymptom: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  symptoms: state.symptoms.symptoms,
  patient: state.patients.selectedPatient
})

const mapDispatchToProps = {
  loadSymptom,
  selectSymptom
}
export default connect(mapStateToProps, mapDispatchToProps)(ListSymptom);

