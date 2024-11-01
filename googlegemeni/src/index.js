import React from 'react';
import ReactDOM from 'react-dom/client';
import Signup from './Authenication/signup/signup';
import ContextProvider from './context/Context';
// import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
<ContextProvider > 
    {/* <App /> */}
    <Signup />
</ContextProvider>
);