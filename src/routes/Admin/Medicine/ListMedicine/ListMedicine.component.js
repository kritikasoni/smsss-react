import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { role } from 'Config';
import { loadMedicine, deleteMedicine } from './../medicine.reducer';
import Medicine from './Medicine.component';

import classes from './ListMedicine.scss';
import SelectMedicine from 'components/SelectMedicine';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';

export class ListMedicine extends Component {
  constructor(props,context) {
    super(props,context);
    this.state =  {
      medicines: [],
      selectedMedicineId: 0
    };
    this._deleteMedicine = this._deleteMedicine.bind(this);
    this._onEditMedicine = this._onEditMedicine.bind(this);
    this._onViewMedicine = this._onViewMedicine.bind(this);
    this._onMedicineChange = this._onMedicineChange.bind(this);
  }

  componentWillMount() {
    this.props.loadMedicine();
  }

  _deleteMedicine(id) {
    this.props.deleteMedicine(id);
  }

  _onViewMedicine(id) {
    this.context.router.push(`/admin/medicines/${id}/detail`);
  }

  _onEditMedicine(id) {
    this.context.router.push(`/admin/medicines/${id}/edit`);
  }
  _onMedicineChange(e) {
    this.setState({selectedMedicineId: e ? e.value : 0});
  }
  render() {
    let medicines = this.props.medicines
      .filter(medicine => {
        if(this.state.selectedMedicineId > 0){
          return medicine.id == this.state.selectedMedicineId
        }
        else return medicine;
      })
      .map((medicine) => {
        return (
          <Medicine key={ medicine.id } {...medicine}>
            {
              (this.props.user.role.name == role.ADMIN) ?
                (<Button
                  className={`btn ${classes.editer} col-xs-12`}
                  onClick={() => this._onEditMedicine(medicine.id)}>
                  EDIT
                </Button>)
                : null
            }
            <button type="button"
                    className={`btn col-xs-12 btn-primary ${classes['medicine-btn__view']}`}
                    onClick={() => this._onViewMedicine(medicine.id)}>
              DETAIL
            </button>
          </Medicine>
        );
      });
    return (
      <div>
        <div className={classes.namepage}>
          <h1>Medicines</h1>
          <Col xs={12} sm={4} smOffset={4} >
            <SelectMedicine onChange={this._onMedicineChange} value={this.state.selectedMedicineId} />
          </Col>
        </div>
        {medicines}
      </div>
    );
  }
}
ListMedicine.propTypes = {
  user: PropTypes.object,
  medicines: PropTypes.array.isRequired,
  loadMedicine: PropTypes.func.isRequired,
  deleteMedicine: PropTypes.func.isRequired
}
ListMedicine.contextTypes = {
  router: PropTypes.any.isRequired
}
const mapStateToProps = (state) =>({
  user: state.auth.user,
  medicines: state.medicines.medicines
});
const mapDispatchToProps = {
  loadMedicine,
  deleteMedicine
}
export default connect(mapStateToProps,mapDispatchToProps)(ListMedicine);
