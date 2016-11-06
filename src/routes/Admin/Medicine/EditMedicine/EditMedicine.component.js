import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { editMedicine, deleteMedicine } from './../medicine.reducer';
import Http from 'helper/Http';
import classes from './EditMedicine.component.scss';
import { BackendUrl } from 'Config';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import DropZone from 'react-dropzone';
import Image from 'react-bootstrap/lib/Image';

export default class EditMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scientificName:'',
      informalName:'',
      image:'',
      detail:'',
      isPill: true
    };
    this._onIsPillCheckboxUpdate = this._onIsPillCheckboxUpdate.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onDelete = this._onDelete.bind(this);
  }
  _onIsPillCheckboxUpdate(e){
    this.setState({isPill: e.target.checked});
  }
  _onSubmit(e) {
    e.preventDefault();
    const medicine = {
      scientificName: this.state.scientificName,
      informalName: this.state.informalName,
      image: this.state.image,
      detail: this.state.detail,
      isPill: this.state.isPill
    };
    this.props.editMedicine(this.props.params.id, medicine);
  }
  _onDelete() {
    this.props.deleteMedicine(this.props.params.id);
  }

  componentWillMount() {
    Http
      .get(`${BackendUrl}/medicines/`+this.props.params.id)
      .then(response => {
        this.setState({
          scientificName : response.data.scientificName,
          informalName: response.data.informalName,
          image: response.data.image,
          detail:response.data.detail,
          isPill: response.data.isPill
        });
      });
  }

  render() {
    return (
      <div>
        <div className="pull-right">
          <Button bsStyle="danger" className={classes['medicine-delete__button']} onClick={this._onDelete}>DELETE</Button>
        </div>
        <Form horizontal onSubmit={this._onSubmit} role="form">
          <h2>{`${this.state.scientificName} ${this.state.informalName ? '(' + this.state.informalName + ')' : ''}`}</h2>
          <FormGroup controlId="formHorizontalScientificName">
            <Col componentClass={ControlLabel} xs={2} sm={2} smOffset={3} >
              SCIENTIFIC NAME :
            </Col>
            <Col xs={10} sm={3}>
              <FormControl type="text" placeholder="Scientific name"
                           value={this.state.scientificName}
                           onChange={(e) => this.setState({scientificName: e.target.value})}
              />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalInformalName">
            <Col componentClass={ControlLabel}  xs={2} sm={2} smOffset={3} >
              INFORMAL NAME :
            </Col>
            <Col  xs={10} sm={3}>
              <FormControl type="text" placeholder="Informal name"
                           value={this.state.informalName}
                           onChange={(e) => this.setState({informalName: e.target.value})}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formHorizontalIsPill">
            <Col componentClass={ControlLabel}  xs={2} sm={2} smOffset={3} >
              This medicine is a pill:
            </Col>
            <Col  xs={10} sm={3}>
              <input type="checkbox" onChange={this._onIsPillCheckboxUpdate} checked={this.state.isPill} className="pull-left"/>
            </Col>
          </FormGroup>
          <div className="row">
            <Col componentClass={ControlLabel}  xs={2} sm={2} smOffset={3} >
              IMAGE :
            </Col>
            <div className="col-xs-10 col-sm-3">
              <DropZone onDrop={this._onDrop}>
                <div>Drop new medicine pictures here, or click to select files to upload.</div>
              </DropZone></div>
            {this.state.image ?
              this.state.image.preview ?
                <div>
                  <div><img src={this.state.image.preview} /></div>
                </div>
                : <div className="col-sm-4">
                <Image className={classes['medicine-image__preview']} src={this.state.image} />
              </div>
              :
              null}
          </div>
          <br />
          <FormGroup controlId="formControlsDetail">
            <Col componentClass={ControlLabel}  xs={2} sm={2} smOffset={3} >
              Detail :
            </Col>
            <Col  xs={10} sm={3}>
              <FormControl componentClass="textarea" placeholder="Detail"
                           value={this.state.detail}
                           onChange={(e) => this.setState({detail: e.target.value})}
              />
            </Col>
          </FormGroup>

          <Button type="submit" className={`btn ${classes.submitbut3}`}>SUBMIT</Button>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  editMedicine,
  deleteMedicine
}

export default connect(null, mapDispatchToProps)(EditMedicine);
