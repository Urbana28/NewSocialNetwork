import React from 'react';
import '../../styles/login.scss';
import LoginForm from "./LoginForm";
import { Redirect } from 'react-router-dom';

interface IProps {
    isAuth: boolean,
    loginUser: (email:string, password:string, rememberMe:boolean, captchaUrl: string) => void,
    captchaUrl: string
}

let LoginPage:React.FC<IProps> = ({isAuth, loginUser, captchaUrl}) => {
    return(
        <div>
            {isAuth ?  <Redirect to='/profilePage'/> : <LoginForm captchaUrl={captchaUrl} loginUser={loginUser}/>}
        </div>
    )
}

export default LoginPage;