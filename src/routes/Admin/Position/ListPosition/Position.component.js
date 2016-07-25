import React from 'react';
import classes from './Position.component.scss';

export const Position = (props) =>  (
  <div>

    <div className={classes.topic12}>

      <div className="row">
        <div className="col-md-12">
          <div className="col-md-6 text-right">{props.name}</div>
        </div>
      </div>
    </div>


  </div>
)
Position.propTypes = {
  name: React.PropTypes.string.isRequired,

}

export default Position;
