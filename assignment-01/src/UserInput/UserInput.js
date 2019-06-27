import React from 'react';

const UserInput = (props) => {

    return (
        <div>
            <input style={props.style} type="text" onChange={props.change} value={props.name} />
        </div>
    )

}

export default UserInput;