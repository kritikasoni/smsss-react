import React, { Component } from 'react';
import axios from 'axios';
import Room from './Room.component';
import { BackendUrl } from 'Config';

export default class ListRoom extends Component {
  constructor(props,context) {
    super(props,context);
    this.state =  {
      rooms: []
    };
    this._deleteRoom = this._deleteRoom.bind(this);
    this._editRoom = this._editRoom.bind(this);
  }

  componentWillMount() {
    axios
      .get(`${BackendUrl}/rooms`)
      .then(response => {
        this.setState({
          rooms : response.data
        });
        console.log(this.state.rooms);
      });
  }

  _deleteRoom(id) {
    axios
      .delete(`${BackendUrl}/rooms/`+id)
      .then(response => {
        let rooms = this.state.rooms.filter(room => room.id != id);
        this.setState({rooms});
      })
      .catch(error => console.log);
  }
  _editRoom(id) {
    this.context.router.push(`/rooms/${id}`);
  }
  render() {
    let rooms = this.state.rooms.map((room) => {
      return (
        <div>
          Room: {room.name}
          <a href={`/admin/rooms/${room.id}/edit`} ><button type="button">Edit</button></a>
          <button type="button" onClick={() => this._deleteRoom(room.id)}>Delete</button>
        </div>
      );
    });
    return (
      <div>
        <h1>Rooms</h1>
        {rooms}
      </div>
    );
  }


}

