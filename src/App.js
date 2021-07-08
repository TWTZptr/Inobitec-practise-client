import './scss/App.scss';
import './reset.scss';
import React from 'react';
import TreeBlock from './components/tree-block';
import InfoBlock from './components/info-block';

function App() {
    return (
        <div className="container">
            <TreeBlock/>
            <InfoBlock/>
        </div>
    );
}

export default App;