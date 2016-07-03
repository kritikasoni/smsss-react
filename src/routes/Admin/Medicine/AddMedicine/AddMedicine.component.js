import React, { Component } from 'react';
import axios from 'axios'; //library เอาไว้ส่งข้อมูล
export default class AddMedicine extends Component {
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
      .post('http://localhost:1337/medicines',{
        scientificName: this.state.scientificName,
        informalName: this.state.informalName,
        image: this.state.image,
        detail:this.state.detail
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

        Scientific name:  <input
        type="text"
        name="scientificName"
        value={this.state.scientificName}
        onChange={(e) => this.setState({scientificName: e.target.value})}
      /> <br />
        Informal name:  <input
        type="text"
        name="informalName"
        value={this.state.informalName}
        onChange={(e) => this.setState({informalName: e.target.value})}
      /> <br />
        Image:  <input
        type="text"
        name="image"
        value={this.state.image}
        onChange={(e) => this.setState({image: e.target.value})}

      />
        <br />
        Detail:  <input
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


