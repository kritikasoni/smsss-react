import React from 'react';

export const Medicine = (props) =>  (
  <div>
    <h1>Scientific name:{props.scientificName}</h1>
    <h2>Informal name:{props.informalName}</h2>
    <div>
      Image:
    <img src={props.image} />
    </div>
    <h3>Detail:{props.detail}</h3>
  </div>
)
Medicine.propTypes = {
  scientificName: React.PropTypes.string.isRequired,
  informalName: React.PropTypes.string.isRequired,
  image: React.PropTypes.string.isRequired,
  detail: React.PropTypes.string.isRequired
}

export default Medicine;
