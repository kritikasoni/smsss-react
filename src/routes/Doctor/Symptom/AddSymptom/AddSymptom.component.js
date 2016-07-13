import React, { Component } from 'react';
import axios from 'axios'; //library เอาไว้ส่งข้อมูล
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
      .get('http://localhost:1337/patients/'+this.props.params.id)
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
      .post('http://localhost:1337/symptoms',{
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
        Detail:
        <textarea
          name="detail"
          value={this.state.detail}
          onChange={(e) => this.setState({detail: e.target.value})}
        />
        <br />
        <button type="submit" >Submit</button>
      </form>
    );
  }
}

