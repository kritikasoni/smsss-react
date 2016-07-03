import React, { Component } from 'react';
import axios from 'axios';
import Medicine from './Medicine.component';

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
      .get('http://localhost:1337/medicines')
      .then(response => {
        this.setState({
          medicines : response.data
        });
        console.log(this.state.medicines);
      });
  }

  _deleteMedicine(id) {
    axios
      .delete('http://localhost:1337/medicines/'+id)
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
          <a href={`/admin/medicines/${medicine.id}/edit`} ><button type="button">Edit</button></a>
          <button type="button" onClick={() => this._deleteMedicine(medicine.id)}>Delete</button>
        </div>
      );
    });
    return (
      <div>
        <h1>Medicines</h1>
        {medicines}
      </div>
    );
  }


}


