import React, { Component } from 'react';
import axios from 'axios';
import { BackendUrl } from 'Config';
export default class EditDepartment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:'',

    };
    this._onSubmit = this._onSubmit.bind(this);
  }
  _onSubmit(e) {
    e.preventDefault();
    console.log('submit');
    axios
      .put(`${BackendUrl}/departments/`+this.props.params.id,{
        name: this.state.name,

      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      })
  }

  render() {
    return (
      <form role="form" onSubmit={this._onSubmit}>

        Department name:
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={(e) => this.setState({name: e.target.value})}
        /> <br />

        <button type="submit" >Submit</button>
      </form>
    );
  }
}


