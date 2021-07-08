import React from 'react';
import {useSelector} from "react-redux";
import '../scss/info-block.scss';

function InfoBlock() {
    const {id, ip, port, name} = useSelector(node => node);

    return (
        id === null ?
            <div className="info-block">
            </div>
            :
            <div className="info-block">
                <div className="node-info">
                    <label className="node-info__field">
                        Имя:
                        <input value={name}/>
                    </label>
                    <label className="node-info__field">
                        IP:
                        <input value={ip}/>
                    </label>
                    <label className="node-info__field">
                        Port:
                        <input value={port}/>
                    </label>
                </div>
                <div className="info-block__buttons">
                    <button>
                        Применить
                    </button>
                    <button>
                        Отмена
                    </button>
                </div>
            </div>

    );
}

export default InfoBlock;