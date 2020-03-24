import React from 'react';
import '../../styles/login.scss';
import LoginForm from "./LoginForm";
import { Redirect } from 'react-router-dom';

interface IProps {
    isAuth: boolean,
    loginUser: (email:string, password:string, rememberMe:boolean) => void
}

let LoginPage:React.FC<IProps> = ({isAuth, loginUser}) => {
    return(
        <div>
            {isAuth ?  <Redirect to='/profilePage'/> : <LoginForm loginUser={loginUser}/>}
        </div>
    )
}

export default LoginPage;