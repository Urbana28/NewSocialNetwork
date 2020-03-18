import React from 'react';
import './App.scss';
import Header from './components/Header';
import NavBar from './components/NavBar';
import {useRoute} from "./hooks/useRoute";

function App() {

    const route = useRoute();

    return (
        <div className="App">
            <Header/>
            <div className='App__navCont'>
                <NavBar/>
                <div className='App__navCont-components'>
                    {route}
                </div>
            </div>


        </div>
    );
}

export default App;
