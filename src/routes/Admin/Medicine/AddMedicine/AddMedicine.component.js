import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { addMedicine } from './../medicine.reducer';
import DropZone from 'react-dropzone';
import classes from './AddMedicine.component.scss';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';

export class AddMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scientificName:'',
      informalName:'',
      image: '',
      detail:'',
      isPill: true
    };
    this._onIsPillCheckboxUpdate = this._onIsPillCheckboxUpdate.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onDrop = this._onDrop.bind(this);
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
      detail:this.state.detail,
      isPill: this.state.isPill
    };
    this.props.addMedicine(medicine);
  }

  _onDrop(file){
    this.setState({ image: file[0] });
  }

  render() {
    return (
      <Form horizontal onSubmit={this._onSubmit} role="form">
        <h2>Add medicine</h2>
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
            <div className="col-xs-12">
              <Col componentClass={ControlLabel}  xs={2} sm={2} smOffset={3} >
                IMAGE :
              </Col>
              <div className="col-xs-10 col-sm-3">
              <DropZone onDrop={this._onDrop}>
                <div>Drop medicine pictures here, or click to select files to upload.</div>
              </DropZone></div>
              {this.state.image.preview ?
                <div>
                  <div><img className={classes['medicine-image__preview']} src={this.state.image.preview} /></div>
                </div>
                :
                <div>
                  <div><img className={classes['medicine-image__preview']} src={'http://placehold.it/350x300'} /></div>
                </div>
              }
            </div>
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
    );
  }
}
AddMedicine.propTypes = {
  addMedicine: PropTypes.func.isRequired
}
const mapDispatchToProps = {
  addMedicine
}
export default connect(null,mapDispatchToProps)(AddMedicine);


