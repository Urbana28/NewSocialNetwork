import {SET_INITIALISATION} from "../store/reducers/appReducer";

export interface IInitialiseAction {
    type: typeof SET_INITIALISATION,
    initialized: boolean
}

export type AppCommonActionTypes = IInitialiseAction