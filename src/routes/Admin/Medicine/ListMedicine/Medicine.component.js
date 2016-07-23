import React from 'react';
import classes from './Medicine.component.scss';

export const Medicine = (props) =>  (
  <div>

    <div className={classes.topic11}>

      <div className="row">
        <div className="col-md-12">
          <div className="col-md-6 text-right">Scientific name:</div>
          <div className="col-md-3"> {props.scientificName}
          </div>
        </div>
      </div>


      <div className="row">
        <div className="col-md-12">
          <div className="col-md-6 text-right">Informal name:</div>
          <div className="col-md-3"> {props.informalName}
          </div>
        </div>
      </div>

      <div>
        <div className={classes.topic11}>

          <div className="row">
            <div className="col-md-12">
              <div className="col-md-6 text-right">Image:</div>
              <div className="col-md-3"> <img src={props.image} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="col-md-6 text-right">Detail:</div>
          <div className="col-md-3"> {props.detail}
          </div>
        </div>
      </div>
    </div>

  </div>
)
Medicine.propTypes = {
  scientificName: React.PropTypes.string.isRequired,
  informalName: React.PropTypes.string.isRequired,
  image: React.PropTypes.string.isRequired,
  detail: React.PropTypes.string.isRequired
}

export default Medicine;
