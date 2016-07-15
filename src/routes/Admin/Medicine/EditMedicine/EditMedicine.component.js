import React, { Component } from 'react';
import axios from 'axios';
import { BackendUrl } from 'Config';
export default class EditMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scientificName:'',
      informalName:'',
      image:'',
      detail:''
    };
    this._onSubmit = this._onSubmit.bind(this);
  }
  _onSubmit(e) {
    e.preventDefault();
    console.log('submit');
    axios
      .put(`${BackendUrl}/medicines/`+this.props.params.id,{
        scientificName: this.state.scientificName,
        informalName: this.state.informalName,
        image: this.state.image,
        detail: this.state.detail
      })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      })
  }

  componentWillMount() {
    axios
      .get(`${BackendUrl}/medicines/`+this.props.params.id)
      .then(response => {
        console.log(response.data);
        this.setState({
          scientificName : response.data.scientificName,
          informalName: response.data.informalName,
          image: response.data.image,
          detail:response.data.detail
        });
      });

  }
  render() {
    return (
      <form role="form" onSubmit={this._onSubmit}>

        Scientific name:
        <input
          type="text"
          name="scientificName"
          value={this.state.scientificName}
          onChange={(e) => this.setState({scientificName: e.target.value})}
        />
        <br />
        Informal name:
        <input
          type="text"
          name="informalName"
          value={this.state.informalName}
          onChange={(e) => this.setState({informalName: e.target.value})}
        />
        <br />
        Image:
        <input
          type="text"
          name="image"
          value={this.state.image}
          onChange={(e) => this.setState({image: e.target.value})}
        />
        <br />
        Detail:
        <input
          type="text"
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


