import {SET_AUTH_USER} from "../store/reducers/LoginReducer";

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



export type LoginCommonActionType = ISetAuthUserAction