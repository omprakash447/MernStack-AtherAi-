import React from 'react';
import './App.css';
import Main from './Components/Main/Main';
import Sidebar from './Components/Sidebar/Sidebar';

function App() {
    return (
        <div className="root">
            <Sidebar />
            <Main />
        </div>
    );
}

export default App;
