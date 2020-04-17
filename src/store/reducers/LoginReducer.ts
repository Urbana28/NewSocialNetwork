import {LoginCommonActionType, ISetAuthUserAction, ISetErrorMessage} from "../../types/loginTypes";
import {Dispatch} from "redux";
import {AppStateType} from "../store";
import {loginAPI} from "../../api/loginAPI";



export const SET_AUTH_USER = 'SET_AUTH_USER';
export const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';
export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

interface IInitialState {
    id: number | null,
    login: string
    email: string,
    isAuth: boolean,
    password: string,
    rememberMe: boolean,
    captchaUrl: string,
    errorMessage: string
}

const initialState:IInitialState = {
    id: null,
    login: '',
    email: '',
    isAuth: false,
    password: '',
    rememberMe: false,
    captchaUrl: '',
    errorMessage: ''
}

export let loginReducer = (state = initialState, action:LoginCommonActionType) => {
    switch(action.type) {
        case SET_AUTH_USER:
            return {
                ...state,
                ...action.data
            };
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            };
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMessage: action.message
            }
        default: return state
    }
}

export const setAuthUser = (id: number | null,login: string,email:string, isAuth: boolean):ISetAuthUserAction => {
    return {
        type: SET_AUTH_USER, data: {id,login,email, isAuth}
    }
};
const setCaptchaUrl = (captchaUrl: string) => {
    return {
        type: GET_CAPTCHA_URL_SUCCESS, captchaUrl
    }
};
const setErrorMessage = (message: string): ISetErrorMessage => {
    return {
        type: SET_ERROR_MESSAGE,
        message
    }
}

export let getAuthUser = () => {
    return (dispatch:Dispatch<LoginCommonActionType>, getState: () => AppStateType) => {
       return loginAPI.getAuthUser()
            .then((res) => {
                if(res.data.resultCode === 0) {
                    let {id,login,email} = res.data.data;
                    dispatch(setAuthUser(id, login, email, true))
                }
            })
    }
};

/*type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, LoginCommonActionType>*/
const getCaptchaUrl = () => {
    return async (dispatch: any) => {
        try {
            let res = await loginAPI.getCaptchaUrl();
            let captchaUrl = res.data.url;
            dispatch(setCaptchaUrl(captchaUrl))


        } catch (e) {
            console.log(e)

        }

    }
}

export let login = (email:string, password:string, rememberMe:boolean, captchaUrl: string) => {
    return (dispatch:any, getState: () => AppStateType) => {
        loginAPI.login(email, password, rememberMe, captchaUrl)
            .then((res) => {
                if(res.data.resultCode === 0) {
                    dispatch(getAuthUser())
                } else if (res.data.resultCode === 10) {
                    dispatch(getCaptchaUrl())
                } else if (res.data.resultCode === 1) {
                    let message = res.data.messages
                    dispatch(setErrorMessage(message))
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

