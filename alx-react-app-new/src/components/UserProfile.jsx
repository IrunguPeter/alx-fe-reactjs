import React from 'react';

const UserProfile = (props) => {
  return (
    <div style={{ border:'ipx solid gray', padding:'10px', margin: '10px'}}>
      <h2 style={{color:'blue'}}>{props.name}</h2>
      <p>Age:<span style={{ fontweight:'bold'}}>{props.age}</span></p>
      <p>Bio: {props.bio}</p>
    </div>
  );
};

export default UserProfile;
