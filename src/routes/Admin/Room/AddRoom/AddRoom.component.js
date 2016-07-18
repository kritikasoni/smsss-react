import React, { Component } from 'react';
import axios from 'axios';
import { BackendUrl } from 'Config';
export default class AddRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name:''
    };
    this._onSubmit = this._onSubmit.bind(this);
  }
  _onSubmit(e) {
    e.preventDefault();
    console.log('submit');
    axios
      .post(`${BackendUrl}/rooms`,{ 
        name: this.state.name,

      })
      .then(response => {
        console.log(response);
        alert('success');
      })
      .catch(err => {
        console.error(err);
      })
  }
  componentWillMount(){
    axios
      .get(`${BackendUrl}/departments`)
      .then(response => {
        this.setState({departmentList:response.data });
      })
      .catch(err => {
        console.error(err);
      })
  }
  render() {
    
    return (
      <form role="form" onSubmit={this._onSubmit}>

        Room name:
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={(e) => this.setState({name: e.target.value})}
        />
        <br />

        <button type="submit" >Submit</button>
      </form>
    );
  }
}


