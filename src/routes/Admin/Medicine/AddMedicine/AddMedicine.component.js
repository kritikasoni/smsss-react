import React, { Component } from 'react';
import axios from 'axios';
import DropZone from 'react-dropzone';
import { BackendUrl } from 'Config';

export default class AddMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scientificName:'',
      informalName:'',
      image:'', //TODO: upload pic in server--backend and get url
      detail:''
    };
    this._onSubmit = this._onSubmit.bind(this);
    this._onDrop = this._onDrop.bind(this);
  }
  _onSubmit(e) {
    e.preventDefault();
    console.log('submit');
    axios
      .post(`${BackendUrl}/medicines`,{
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

  _onDrop(file){
    console.log('file',file);
    this.setState({ image: file[0] });
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
        Informal name:
        <input
          type="text"
          name="informalName"
          value={this.state.informalName}
          onChange={(e) => this.setState({informalName: e.target.value})}
        />
        <br />
        Image:
        <DropZone onDrop={this._onDrop}>
          <div>Drop medicine pictures here, or click to select files to upload.</div>
        </DropZone>
        {this.state.image ?
          <div>
            <div><img src={this.state.image.preview} /></div>
          </div>
          :
          null}
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


