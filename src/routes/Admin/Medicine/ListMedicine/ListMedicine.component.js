import React, { Component } from 'react';
import axios from 'axios';
import Medicine from './Medicine.component';
import { BackendUrl } from 'Config';
import classes from './ListMedicine.scss';

export default class ListMedicine extends Component {
  constructor(props,context) {
    super(props,context);
    this.state =  {
      medicines: []
    };
    this._deleteMedicine = this._deleteMedicine.bind(this);
    this._editMedicine = this._editMedicine.bind(this);
  }

  componentWillMount() {
    axios
      .get(`${BackendUrl}/medicines`)
      .then(response => {
        this.setState({
          medicines : response.data
        });
        console.log(this.state.medicines);
      });
  }

  _deleteMedicine(id) {
    axios
      .delete(`${BackendUrl}/medicines/`+id)
      .then(response => {
        let medicines = this.state.medicines.filter(medicine => medicine.id != id);
        this.setState({medicines});
      })
      .catch(error => console.log);
  }
  _editMedicine(id) {
    this.context.router.push(`/medicines/${id}`);
  }
  render() {
    let medicines = this.state.medicines.map((medicine) => {
      return (
        <div>
          <Medicine key={ medicine.id } {...medicine} />
          <a href={`/admin/medicines/${medicine.id}/edit`} >
            <button type="button" className={`btn ${classes.editer}`}>EDIT</button></a>
          <button type="button" className={`btn ${classes.deleter}`} onClick={() => this._deleteMedicine(medicine.id)}>Delete</button>
        </div>
      );
    });
    return (
      <div>
        <div className={classes.namepage}><h1>Medicines</h1></div>
        {medicines}
      </div>
    );
  }


}


