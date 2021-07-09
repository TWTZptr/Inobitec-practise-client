import React from 'react';
import '../scss/remove-add-buttons-block.scss'
import Button from "./button";

function RemoveAddButtonsBlock() {
    return (
        <div className="remove-add-buttons-block">
            <Button buttonText="Добавить"/>
            <Button buttonText="Удалить"/>
        </div>
    );
}

export default RemoveAddButtonsBlock;