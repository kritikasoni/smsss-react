import React from 'react';

export const Room = (props) =>  (
  <div>
    <h1>{props.name}</h1>
   
  </div>
)
Room.propTypes = {
  name: React.PropTypes.string.isRequired,

}

export default Room;
