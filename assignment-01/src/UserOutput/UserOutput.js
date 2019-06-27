import React from 'react';
import './UserOutput.css';

const UserOutput = (props) => {
    return (
        <div className="UserOutputCard">
            <p>This is a user named {props.name}</p>
        </div>
    )
}

export default UserOutput;