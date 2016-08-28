import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadPrescription, selectPrescription } from './prescription.reducer';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import Col from 'react-bootstrap/lib/Col';
import moment from 'moment';
export class ListPrescription extends Component {
  constructor(props,context) {
    super(props,context);
  }

  componentWillMount() {
    this.props.loadPrescription(this.props.patient.id);
  }

  _editPrescription(id) {
    this.props.selectPrescription(id);
    this.props.onEditPrescription();
  }

  render() {
    let prescriptions = this.props.prescriptions.map((prescription) => {
      return (
        <div key={prescription.id} style={{paddingLeft:'10px'}}>
          <p>Date time: {moment(prescription.createdAt).format('YYYY/MM/DD HH:mm').toString()}</p>
          <Col xs={4} xsOffset={8}>
            <Button bsStyle={'primary'} className="col-xs-12" onClick={() => this._editPrescription(prescription.id)}>
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
            {`Prescriptions of patient: ${this.props.patient.firstName} ${this.props.patient.lastName}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{marginBottom:'30px'}}>
          {prescriptions}
        </Modal.Body>
        <Modal.Footer style={{marginTop:'50px'}}>
          <Button bsStyle="danger" onClick={() => { this.props.closeModal() }}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ListPrescription.contextTypes = {
  router: PropTypes.any.isRequired
}
ListPrescription.propTypes = {
  patient: PropTypes.object.isRequired,
  prescriptions: PropTypes.array.isRequired,
  loadPrescription: PropTypes.func.isRequired,
  isModalClosed: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  onEditPrescription: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  prescriptions: state.prescriptions.prescriptions,
  patient: state.patients.selectedPatient
})
const mapDispatchToProps = {
  loadPrescription,
  selectPrescription
}
export default connect(mapStateToProps, mapDispatchToProps)(ListPrescription);
