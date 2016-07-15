import React, { Component } from 'react';
import axios from 'axios';
import Nurse from './Nurse.component';
import { BackendUrl } from 'Config';

export default class ListNurse extends Component {
  constructor(props,context) {
    super(props,context);
    this.state =  {
      nurses: []
    };
    this._deleteNurse = this._deleteNurse.bind(this);
    this._editNurse = this._editNurse.bind(this);
  }

  componentWillMount() {
    axios
      .get(`${BackendUrl}/nurses`)
      .then(response => {
        this.setState({
          nurses : response.data
        });
        console.log(this.state.nurses);
      });
  }

  _deleteNurse(id) {
    axios
      .delete(`${BackendUrl}/nurses/`+id)
      .then(response => {
        let nurses = this.state.nurses.filter(nurse => nurse.id != id);
        this.setState({nurses});
      })
      .catch(error => console.log);
  }
  _editNurse(id) {
    this.context.router.push(`/nurses/${id}`);
  }
  render() {
    let nurses = this.state.nurses.map((nurse) => { //map ทำเพื่อเอาtagไปใส่
      return (
        <div>
          <Nurse key={ nurse.id } {...nurse} />
          <a href={`/admin/nurses/${nurse.id}/edit`} ><button type="button">Edit</button></a>
          <button type="button" onClick={() => this._deleteNurse(nurse.id)}>Delete</button>
        </div>
      );
    });
    return (
      <div>
        <h1>Nurses</h1>
        {nurses}
      </div>
    );
  }


}

