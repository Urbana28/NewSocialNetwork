import {
    ISetUsersAction,
    IUser,
    FriendsCommonActionType,
    IFollowUserAction,
    IUnFollowUserAction, ISetCurrentPage, ISetTotalCount, ISetIsFetching, ISetIsFollowingInProgress
} from "../../types/friendsTypes";
import {Dispatch} from "redux";
import {AppStateType} from "../store";
import {friendsAPI} from "../../api/friendsAPI";

export const SET_USERS = 'SET_USERS';
export const FOLLOW_USER = 'FOLLOW_USER';
export const UNFOLLOW_USER = 'UNFOLLOW_USER';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
export const SET_IS_FETCHING = 'SET_IS_FETCHING';
export const SET_IS_FOLLOWING_IN_PROGRESS = 'SET_IS_FOLLOWING_IN_PROGRESS';

interface IInitialState {
    users: Array<IUser>,
    totalUsersCount: number,
    count: number,
    currentPage: number,
    isFetching: boolean,
    isFollowingInProgress: Array<number>
}

let initialState: IInitialState = {
    users: [],
    totalUsersCount: 0,
    count: 10,
    currentPage: 1,
    isFetching: false,
    isFollowingInProgress: []
};

export let friendsReducer = (state = initialState, action: FriendsCommonActionType): IInitialState => {
    switch (action.type) {
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            };
        case SET_TOTAL_COUNT:
            return {
                ...state,
                 totalUsersCount: action.totalCount
            }
        case FOLLOW_USER:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return {...u, followed: true}
                    } else {
                        return u
                    }
                })
            };
        case UNFOLLOW_USER:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.id) {
                        return {...u, followed: false}
                    } else {
                        return u
                    }
                })
            };
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case SET_IS_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                isFollowingInProgress: action.isFetching
                    ? [...state.isFollowingInProgress, action.id]
                    : state.isFollowingInProgress.filter(id => id !== action.id)
            }
        default:
            return state
    }
};


export const setUsers = (users: Array<IUser>): ISetUsersAction => {
    return {
        type: SET_USERS,
        users
    }
};
export const followUser = (id: number | string): IFollowUserAction => {
    return {
        type: FOLLOW_USER,
        id
    }
};
export const unFollowUser = (id: number | string): IUnFollowUserAction => {
    return {
        type: UNFOLLOW_USER,
        id
    }
};
export const setCurrentPage = (currentPage:number): ISetCurrentPage => {
    return {
        type: SET_CURRENT_PAGE,
        currentPage
    }
};
export const setTotalUsersCount = (totalCount: number): ISetTotalCount => {
    return {
        type: SET_TOTAL_COUNT,
        totalCount
    }
};
export const setIsFetching = (isFetching: boolean): ISetIsFetching => {
    return {
        type: SET_IS_FETCHING,
        isFetching
    }
}
export const setIsFollowingInProgress = (isFetching: boolean, id: number): ISetIsFollowingInProgress => {
    return {
        type: SET_IS_FOLLOWING_IN_PROGRESS,
        isFetching,
        id
    }
}

export let getUsers = (currentPage:number, count:number) => {
    return (dispatch: Dispatch<FriendsCommonActionType>, getState: () => AppStateType) => {
        dispatch(setIsFetching(true))
        friendsAPI.getUsers(currentPage, count)
            .then((res) => {
                dispatch(setIsFetching(false))
                dispatch(setUsers(res.data.items));
                dispatch(setTotalUsersCount(res.data.totalCount))
            })

    }
};

export let onPageChanged = (pageNumber:number,  count:number) => {
    return (dispatch: Dispatch<FriendsCommonActionType>, getState: () => AppStateType) => {
        dispatch(setCurrentPage(pageNumber));
        dispatch(setIsFetching(true))
        friendsAPI.onPageChange(pageNumber, count)
            .then((res) => {
                dispatch(setIsFetching(false))
                dispatch(setUsers(res.data.items))
            })

    }
};


export let befriendUser = (userId: number) => {
    return (dispatch: Dispatch<FriendsCommonActionType>, getState: () => AppStateType) => {
        dispatch(setIsFollowingInProgress(true, userId))
        friendsAPI.befriendUser(userId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(followUser(userId))
                }
                dispatch(setIsFollowingInProgress(false, userId))
            })
    }
};

export let stopFriendUser = (userId: number) => {
    return (dispatch: Dispatch<FriendsCommonActionType>, getState: () => AppStateType) => {
        dispatch(setIsFollowingInProgress(true, userId))
        friendsAPI.stopFriendUser(userId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(unFollowUser(userId))
                }
                dispatch(setIsFollowingInProgress(false, userId))
            })
    }
};
