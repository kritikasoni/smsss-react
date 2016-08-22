import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addSymptom } from './symptom.reducer';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';

export class AddSymptom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symptom: {
        patient: props.patientId,
        detail: ''
      }
    }
    this._onSubmit = this._onSubmit.bind(this);
  }

  _onSubmit(e) {
    e.preventDefault();
    let symptom = this.state.symptom;
    this.props.addSymptom(symptom);
    this.props.closeModal();
  }

  render() {
    return (
      <Modal show={!this.props.isModalClosed} onHide={() => {this.props.closeModal()}}>
        <Modal.Header closeButton>
          <Modal.Title>Add symptom</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{marginBottom:'30px'}}>
          <Form horizontal onSubmit={this._onSubmit} role="form">
            <FormGroup controlId="formHorizontalDetail">
              <Col componentClass={ControlLabel} xs={2}>
                Detail :
              </Col>
              <Col xs={10}>
            <textarea
              className="form-control"
              value={this.state.symptom.detail}
              onChange={(e) => this.setState({symptom: {...this.state.symptom, detail: e.target.value}})}
            />
              </Col>
            </FormGroup>
            <Col xs={12} >
              <Button type="submit" bsStyle={'primary'} className={`pull-right`}>SUBMIT</Button>
            </Col>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
}

AddSymptom.propTypes = {
  patientId: PropTypes.any.isRequired,
  addSymptom: PropTypes.func.isRequired,
  isModalClosed: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
}

const mapDispatchToProps = {
  addSymptom
}

export default connect(null, mapDispatchToProps)(AddSymptom);
