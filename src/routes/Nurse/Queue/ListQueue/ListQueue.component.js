import React, { Component } from 'react';
import axios from 'axios';
import { BackendUrl } from 'Config';
import Socket from 'helper/Socket';

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
    const self = this;
    Socket.get('/queues', (body, JWR) => {
      self.setState({queues: body});
      console.log(self.state.queues);
    });
    Socket.on('queue', (event) => {
      if(event.verb === 'created') {
        self.setState({queues: [...self.state.queues, event.data ]})
      }
      else if (event.verb === 'destroyed') {
        self.setState({queues: self.state.queues.map(q => q != event.data.id)})
      }
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
    let queues = this.state.queues.map((queue) => {
      return (
        <div>
          <h2>{queue.time}</h2>
          <h2>{queue.patient}</h2>
          <h3>{queue.room}</h3>
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

