import {LoginCommonActionType, ISetAuthUserAction} from "../../types/loginTypes";
import {Dispatch} from "redux";
import {AppStateType} from "../store";
import {loginAPI} from "../../api/loginAPI";



export const SET_AUTH_USER = 'SET_AUTH_USER';


interface IInitialState {
    id: number | null,
    login: string
    email: string,
    isAuth: boolean,
    password: string,
    rememberMe: boolean
}

const initialState:IInitialState = {
    id: null,
    login: '',
    email: '',
    isAuth: false,
    password: '',
    rememberMe: false
}

export let loginReducer = (state = initialState, action:LoginCommonActionType) => {
    switch(action.type) {
        case SET_AUTH_USER:
            return {
                ...state,
                ...action.data
            };
        default: return state
    }
}

export const setAuthUser = (id: number | null,login: string,email:string, isAuth: boolean):ISetAuthUserAction => {
    return {
        type: SET_AUTH_USER, data: {id,login,email, isAuth}
    }
};

export let getAuthUser = () => {
    return (dispatch:Dispatch<LoginCommonActionType>, getState: () => AppStateType) => {
        loginAPI.getAuthUser()
            .then((res) => {
                if(res.data.resultCode === 0) {
                    let {id,login,email} = res.data.data;
                    dispatch(setAuthUser(id, login, email, true))
                }
            })
    }
};

/*type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, LoginCommonActionType>*/

export let login = (email:string, password:string, rememberMe:boolean) => {
    return (dispatch:any, getState: () => AppStateType) => {
        loginAPI.login(email, password, rememberMe)
            .then((res) => {
                if(res.data.resultCode === 0) {
                    dispatch(getAuthUser())
                }
            })
    }
}

export let logout = () => {
    return (dispatch:Dispatch<LoginCommonActionType>, getState: () => AppStateType) => {
        loginAPI.logout()
            .then((res) => {
                if(res.data.resultCode === 0) {
                    dispatch(setAuthUser(null, '', '', false))
                }
            })
    }
}

