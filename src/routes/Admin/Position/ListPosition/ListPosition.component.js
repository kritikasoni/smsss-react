import React, { Component } from 'react';
import axios from 'axios';
import Position from './Position.component';
import { BackendUrl } from 'Config';
import classes from './ListPosition.component.scss';

export default class ListPosition extends Component {
  constructor(props,context) {
    super(props,context);
    this.state =  {
      positions: []
    };
    this._deletePosition = this._deletePosition.bind(this);
    this._editPosition = this._editPosition.bind(this);
  }

  componentWillMount() {
    axios
      .get(`${BackendUrl}/positions`)
      .then(response => {
        this.setState({
          positions : response.data
        });
        console.log(this.state.positions);
      });
  }

  _deletePosition(id) {
    axios
      .delete(`${BackendUrl}/positions/`+id)
      .then(response => {
        let positions = this.state.positions.filter(position => position.id != id);
        this.setState({positions});
      })
      .catch(error => console.log);
  }
  _editPosition(id) {
    this.context.router.push(`/positions/${id}`);
  }
  render() {
    let positions = this.state.positions.map((position) => {
      return (
        <div>
          <div className={classes.topic13}>

            <div className="row">
              <div className="col-md-12">
                <div className="col-md-12 text-center">Position: {position.name}

                  <a href={`/admin/positions/${position.id}/edit`} >
                    <button type="button" className={`btn ${classes.editer2}`}>EDIT</button></a>
                  <button type="button" className={`btn ${classes.deleter2}`} onClick={() => this._deletePosition(position.id)}>DELETE</button>
                </div>

              </div>
            </div>
          </div>



        </div>
      );
    });
    return (
      <div>
        <div className={classes.namepage2}><h1>Positions</h1></div>
        {positions}
      </div>
    );
  }


}

