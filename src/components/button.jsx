import React from 'react';

function Button ({onClick, buttonText, className}) {
    return (
        <button className={className} onClick={onClick}>
            {buttonText}
        </button>
    );

}

export default Button;