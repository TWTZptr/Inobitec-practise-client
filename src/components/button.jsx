import React from 'react';

function Button ({onClickHandle, buttonText}) {
    return (
        <button onClick={onClickHandle}>
            {buttonText}
        </button>
    );

}

export default Button;