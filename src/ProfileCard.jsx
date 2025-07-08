import React from 'react';
function ProfileCard(props) {
    return(
        <div style={{
            boder:'1px solid #cc',
            padding:'10px',
            margin:'10px',
            borderRadius:'8px',
            width:'200px'

        }}>
            <h3>{props.name}</h3>
            <p>Age:{props.age}</p>
            <p>Location:{props.location}</p>
            </div>

    );
}