import React from 'react';
import '../../styles/login.scss';
import LoginForm from "./LoginForm";
import { Redirect } from 'react-router-dom';


interface IProps {
    isAuth: boolean,
    loginUser: (email:string, password:string, rememberMe:boolean, captchaUrl: string) => void,
    captchaUrl: string,
    errorMessage: string
}

let LoginPage:React.FC<IProps> = ({isAuth, loginUser, captchaUrl, errorMessage}) => {
    return(
        <div>
            {isAuth ?  <Redirect to='/profilePage'/> : <LoginForm errorMessage={errorMessage} captchaUrl={captchaUrl} loginUser={loginUser}/>}
        </div>
    )
}

export default LoginPage;