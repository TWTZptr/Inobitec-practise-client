import React from 'react';

function Button ({onClick, buttonText}) {
    return (
        <button onClick={onClick}>
            {buttonText}
        </button>
    );

}

export default Button;