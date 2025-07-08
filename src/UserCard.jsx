import React from 'react';
function UserCard(props) {
    return (
        <div style={{
             border: '1px solid #ccc',
      padding: '10px',
      borderRadius: '6px',
      margin: '10px',
      width: '250px'
        }}>
        <h3>{props.name}</h3>
      <p>Email: {props.email}</p>
      <p>Location: {props.location}</p>
        </div>
    );
}
export default UserCard