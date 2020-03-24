import React, {useCallback} from 'react';
import LoginPage from "./LoginPage";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {login} from "../../store/reducers/LoginReducer";

let LoginContainer = () => {

    let dispatch = useDispatch();
    let isAuth = useSelector((state:AppStateType) => state.loginPage.isAuth)
    const loginUser = useCallback((email:string, password:string, rememberMe:boolean) => {
        dispatch(login(email, password, rememberMe))
    }, [dispatch])
    return (
        <div>
            <LoginPage loginUser={loginUser} isAuth={isAuth}/>
        </div>
    )
}

export default LoginContainer;