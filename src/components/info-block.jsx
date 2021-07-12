import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import setSelectedNode from '../redux/actions/nodeSelect';
import '../scss/info-block.scss';
import Button from './button';

function InfoBlock() {
    let {ip, name, id, port} = useSelector(state => state.selectedNode);

    const [localState, setLocalState] = React.useState({ip, name, id, port});

    React.useEffect(() => {
        setLocalState({ip, name, id, port});
    }, [ip, name, id, port]);

    const dispatch = useDispatch();
    const cancelButtonHandler = (event) => {
        setLocalState({ip, name, id, port});
    };

    const applyButtonHandler = (event) => {
        console.log('apply');
    };

    const handleLabelChange = (event) => {
        setLocalState((prevState) => {
            return {...prevState, name: event.target.value};
        });
    };

    const handleIpChange = (event) => {
        setLocalState((prevState) => {
            return {...prevState, ip: event.target.value};
        });
    }

    const handlePortChange = (event) => {
        setLocalState((prevState) => {
            return {...prevState, port: event.target.value};
        });
    }

    return (
        id === null ?
            <div className="info-block">
            </div>
            :
            <div className="info-block">
                <div className="node-info">
                    <label className="node-info__field">
                        <div> Имя: </div>
                        <input value={localState.name} onChange={handleLabelChange}/>
                    </label>
                    <label className="node-info__field">
                        <div>IP:</div>
                        <input value={localState.ip} onChange={handleIpChange}/>
                    </label>
                    <label className="node-info__field">
                        <div>Port:</div>
                        <input value={localState.port} onChange={handlePortChange}/>
                    </label>
                </div>
                <div className="info-block__buttons">
                    <Button onClickHandle={applyButtonHandler} buttonText="Применить"/>
                    <Button onClickHandle={cancelButtonHandler} buttonText="Отмена"/>
                </div>
            </div>
    );
}

export default InfoBlock;