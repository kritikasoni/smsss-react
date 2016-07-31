import React, { Component } from 'react';
import axios from 'axios';
import { BackendUrl } from 'Config';
import classes from './ListRoom.component.scss';

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
          <div className={classes.topic13}>

            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12 text-center">Room: {room.name}

                  <a href={`/admin/rooms/${room.id}/edit`} >
                    <button type="button" className={`btn ${classes.editer2}`}>EDIT</button></a>
                  <button type="button" className={`btn ${classes.deleter2}`} onClick={() => this._deleteRoom(room.id)}>DELETE</button>
                </div>

              </div>
            </div>
          </div>



        </div>
      );
    });
    return (
      <div>
        <div className={classes.namepage2}><h1>Rooms</h1></div>
        {rooms}
      </div>
    );
  }


}
