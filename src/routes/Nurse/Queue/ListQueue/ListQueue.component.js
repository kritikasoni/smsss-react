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
    // axios
    //   .get(`${BackendUrl}/queues`)
    //   .then(response => {
    //     this.setState({
    //       queues : response.data
    //     });
    //     console.log(this.state.queues);
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
    io.sails.url = BackendUrl;
    io.socket.get('/queues', function serverResponded (body, JWR) {

      // JWR ==> "JSON WebSocket Response"
      console.log('Sails responded with: ', body);
      console.log('with headers: ', JWR.headers);
      console.log('and with status code: ', JWR.statusCode);

      // first argument `body` === `JWR.body`
      // (just for convenience, and to maintain familiar usage, a la `JQuery.get()`)
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

