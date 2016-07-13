import React, { Component } from 'react';
import axios from 'axios';
import Symptom from './Symptom.component';

export default class ListSymptom extends Component {
  constructor(props,context) {
    super(props,context);
    this.state =  {
      symptoms: []
    };
    this._deleteSymptom = this._deleteSymptom.bind(this);
    this._editSymptom = this._editSymptom.bind(this);
  }

  componentWillMount() {
    axios
      .get('http://localhost:1337/symptoms/patient/' + this.props.params.id)
      .then(response => {
        this.setState({
          symptoms : response.data
        });
        console.log(this.state.symptoms);
      });
  }

  _deleteSymptom(id) {
    axios
      .delete('http://localhost:1337/symptoms/'+id)
      .then(response => {
        let symptoms = this.state.symptoms.filter(symptom => symptom.id != id);
        this.setState({symptoms});
      })
      .catch(error => console.log);
  }
  _editSymptom(id) {
    this.context.router.push(`/symptoms/${id}`);
  }
  render() {
    let symptoms = this.state.symptoms.map((symptom) => { //map ทำเพื่อเอาtagไปใส่
      return (
        <div>
          <Symptom key={symptom.id } {...symptom} />
          <a href={`/doctor/symptoms/${symptom.id}/edit`} ><button type="button">Edit</button></a>
          <button type="button" onClick={() => this._deleteSymptom(symptom.id)}>Delete</button>
        </div>
      );
    });
    return (
      <div>
        <h1>Symptoms</h1>
        {symptoms}
      </div>
    );
  }


}

