import {GET_CAPTCHA_URL_SUCCESS, SET_AUTH_USER} from "../store/reducers/LoginReducer";

interface IData {
    id: number | null,
    login: string,
    email: string,
    isAuth: boolean
}
export interface ISetAuthUserAction  {
    type: typeof SET_AUTH_USER,
    data :IData
}

export interface IGetCaptchaUrl {
    type: typeof GET_CAPTCHA_URL_SUCCESS,
    captchaUrl: string
}



export type LoginCommonActionType = ISetAuthUserAction | IGetCaptchaUrl