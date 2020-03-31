import {AppCommonActionTypes, IInitialiseAction} from "../../types/appTypes";
import {Dispatch} from "redux";
import {getAuthUser} from "./LoginReducer";
import {AppStateType} from "../store";
import {loginAPI} from "../../api/loginAPI";

export const SET_INITIALISATION = 'SET_INITIALISATION';

interface IInitialState {
    initialized: boolean
}

const initialState:IInitialState = {
    initialized: false
}

export let appReducer = (state = initialState, action:AppCommonActionTypes) => {
    switch (action.type) {
        case SET_INITIALISATION:
            return {
                ...state,
                initialized:action.initialized
            };
        default: return state
    }
};

let setInitialisation = (initialized:boolean):IInitialiseAction => {
    return {
        type: SET_INITIALISATION,
        initialized
    }
};

export let setInitialise = () => (dispatch: any, getState: () => AppStateType) => {
        let promise = dispatch(getAuthUser());
        promise.then(() => {
            dispatch(setInitialisation(true))
        })
    }


