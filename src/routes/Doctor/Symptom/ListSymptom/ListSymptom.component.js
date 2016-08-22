import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { loadSymptom } from './symptom.reducer';
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
    this.context.router.push(`/doctor/symptoms/${id}/edit`);
  }
  _deleteSymptom(id) {
    this.props.deleteSymptom(id);
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
          <Modal.Title>Symptoms history</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{marginBottom:'30px'}}>
          {symptoms}
        </Modal.Body>
      </Modal>
    );
  }
}

ListSymptom.contextTypes = {
  router: PropTypes.any.isRequired
}
ListSymptom.propTypes = {
  patientId: PropTypes.any.isRequired,
  symptoms: PropTypes.array.isRequired,
  loadSymptom: PropTypes.func.isRequired,
  isModalClosed: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  symptoms: state.symptoms.symptoms
})
const mapDispatchToProps = {
  loadSymptom
}
export default connect(mapStateToProps, mapDispatchToProps)(ListSymptom);
