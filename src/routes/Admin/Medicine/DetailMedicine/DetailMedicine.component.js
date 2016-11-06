import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { role } from 'Config';
import classes from './DetailMedicine.component.scss';
import Http from 'helper/Http';
import { BackendUrl } from 'Config';
import Button from 'react-bootstrap/lib/Button';
import Medicine from './../ListMedicine/Medicine.component';

export default class DetailMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medicine: {
        id: 0,
        scientificName: '',
        informalName: '',
        image: '',
        detail: '',
        isPill: true
      }
    };

    this._editMedicine = this._editMedicine.bind(this);
  }

  _editMedicine() {
    this.context.router.push(`/admin/medicines/${this.state.medicine.id}/edit`);
  }

  componentWillMount() {
    Http
      .get(`${BackendUrl}/medicines/${this.props.params.id}`)
      .then(({data}) => {
        this.setState({
          medicine: data
        });
      });

  }
  render() {
    return (
      <Medicine scientificName={this.state.medicine.scientificName}
                informalName={this.state.medicine.informalName}
                image={this.state.medicine.image}
                detail={this.state.medicine.detail}
                isPill={this.state.medicine.isPill} >
        {
          (this.props.user.role.name == role.ADMIN) ?
            (<Button
              className={`btn ${classes.editer} col-xs-12`}
              onClick={() => this._editMedicine(this.state.medicine.id)}>
              EDIT
            </Button>)
            : null
        }
      </Medicine>
    );
  }
}

DetailMedicine.propTypes = {
  user: PropTypes.object
}
DetailMedicine.contextTypes = {
  router: PropTypes.any.isRequired
}
const mapStateToProps = (state) =>({
  user: state.auth.user
});
export default connect(mapStateToProps)(DetailMedicine);
