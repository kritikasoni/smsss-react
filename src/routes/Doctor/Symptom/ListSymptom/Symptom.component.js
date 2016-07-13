import React from 'react';

export const Symptom = (props) =>  (
  <div>
    <h2>{props.detail}</h2>

  </div>
)
Symptom.propTypes = {
  detail: React.PropTypes.string.isRequired,
  
}

export default Symptom;
