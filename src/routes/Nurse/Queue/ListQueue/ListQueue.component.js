import React, { Component } from 'react';
import axios from 'axios';
import { BackendUrl } from 'Config';
export default class ListQueue extends Component {
  constructor(props,context) {
    super(props,context);
    this.state =  {
      queues: []
    };
    this._deleteQueue = this._deleteQueue.bind(this);
    this._editQueue = this._editQueue.bind(this);
  }

  componentWillMount() {
    axios
      .get(`${BackendUrl}/queues/patient/` + this.props.params.id)
      .then(response => {
        this.setState({
          queues : response.data
        });
        console.log(this.state.queues);
      });
  }

  _deleteQueue(id) {
    axios
      .delete(`${BackendUrl}/queues/`+id)
      .then(response => {
        let queues = this.state.queues.filter(queue => queue.id != id);
        this.setState({queues});
      })
      .catch(error => console.log);
  }
  _editQueue(id) {
    this.context.router.push(`/queues/${id}`);
  }
  render() {
    let queues = this.state.queues.map((queue) => { //map ทำเพื่อเอาtagไปใส่
      return (
        <div>
          <h2>{queue.detail}</h2>
          <h2>{queue.patient}</h2>
          <a href={`/nurse/queues/${queue.id}/edit`} ><button type="button">Edit</button></a>
          <button type="button" onClick={() => this._deleteQueue(queue.id)}>Delete</button>
        </div>
      );
    });
    return (
      <div>
        <h1>Queues</h1>
        {queues}
      </div>
    );
  }


}

