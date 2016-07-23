import React, { Component } from 'react';
import axios from 'axios'; //library เอาไว้ส่งข้อมูล
import { BackendUrl } from 'Config';
import classes from './AddSymptom.component.scss';
export default class AddSymptom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail:'',
      patient:{},

    };
    this._onSubmit = this._onSubmit.bind(this);
  }
  componentWillMount() {
    axios
      .get(`${BackendUrl}/patients/`+this.props.params.id)
      .then(response => {
        this.setState({
          patient : response.data
        });
        console.log(this.state.patient);
      });
  }
  _onSubmit(e) {
    e.preventDefault();
    console.log('submit');
    axios
      .post(`${BackendUrl}/symptoms`,{
        detail: this.state.detail,
        patient: this.state.patient,

      })
      .then(response => {
        console.log(response);
        alert('success');
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {

    return (
      <form role="form" onSubmit={this._onSubmit}>

        <div className={classes.topic9}>

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6 text-right">DETAIL :</div>

        <textarea className="col-md-4"
          name="detail"
          value={this.state.detail}
          onChange={(e) => this.setState({detail: e.target.value})}/>
              
            </div>
          </div>
        </div>

        <button type="submit"className={`btn ${classes.submitbut8}`} >SUBMIT</button>
      </form>
    );
  }
}

