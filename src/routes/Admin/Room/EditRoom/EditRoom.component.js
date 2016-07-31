import React, { Component } from 'react';
import axios from 'axios';
import { BackendUrl } from 'Config';
export default class EditRoom extends Component {
  constructor(props, context) {
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
      .put(`${BackendUrl}/rooms/${this.props.params.id}`,{
        name: this.state.name,
      })
      .then(response => {
        console.log(response);
        this.props.history.push('/admin/rooms'); //redirect to rooms
      })
      .catch(err => {
        console.error(err);
      })

  }
  componentWillMount() {
    axios
      .get(`${BackendUrl}/rooms/${this.props.params.id}`)
      .then(response => {
        this.setState({
          name : response.data.name
        });
        console.log(this.state.name);
      });
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
      /> <br />

        <button type="submit" >Submit</button>
      </form>
    );
  }
}


