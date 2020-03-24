import React from 'react';
import './App.scss';
import NavBar from './components/NavBar';
import {useRoute} from "./hooks/useRoute";
import HeaderContainer from "./components/HeaderContainer";

function App() {

    const route = useRoute();

    return (
        <div className="App">
            <HeaderContainer/>
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
