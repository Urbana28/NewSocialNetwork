import React, {useCallback} from 'react';
import LoginPage from "./LoginPage";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {login} from "../../store/reducers/LoginReducer";

let LoginContainer = () => {

    let dispatch = useDispatch();
    let isAuth = useSelector((state:AppStateType) => state.loginPage.isAuth)
    let captchaUrl = useSelector((state:AppStateType) => state.loginPage.captchaUrl)
    const loginUser = useCallback((email:string, password:string, rememberMe:boolean, captchaUrl: string) => {
        dispatch(login(email, password, rememberMe, captchaUrl))
    }, [dispatch])
    return (
        <div>
            <LoginPage captchaUrl={captchaUrl} loginUser={loginUser} isAuth={isAuth}/>
        </div>
    )
}

export default LoginContainer;