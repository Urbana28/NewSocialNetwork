import React, {useEffect} from 'react';
import App from "./App";
import {setInitialise} from "./store/reducers/appReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./store/store";
import Preloader from "./components/preloader/Preloader";

let AppContainer = () => {
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(setInitialise())
    }, [dispatch]);
    let initialized = useSelector((state: AppStateType) => state.app.initialized);
    let isAuth = useSelector((state: AppStateType) => state.loginPage.isAuth);

    if (!initialized) {
        return <Preloader />
    }
    return (
        <div>
            <App isAuth={isAuth} />
        </div>
    )
};

export default AppContainer;