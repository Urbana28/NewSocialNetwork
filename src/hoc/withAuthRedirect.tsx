import React from 'react'
import {useSelector} from "react-redux";
import {AppStateType} from "../store/store";
import { Redirect } from 'react-router-dom';


const withAuthRedirect = (Component: React.FC) => {
    const ComponentContainer = (props: any) => {
        let isAuth = useSelector((state: AppStateType) => state.loginPage.isAuth)
        if(!isAuth) return  <Redirect to='loginPage' />;
        return <Component {...props} />
    }

    return ComponentContainer
};

export default withAuthRedirect




