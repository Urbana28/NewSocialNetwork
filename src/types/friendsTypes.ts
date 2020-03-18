import {
    FOLLOW_USER,
    SET_CURRENT_PAGE, SET_IS_FETCHING, SET_IS_FOLLOWING_IN_PROGRESS,
    SET_TOTAL_COUNT,
    SET_USERS,
    UNFOLLOW_USER
} from "../store/reducers/friendsReducer";

export interface IPhotosUser {
    small: any
    large: any
}

export interface IUser {
    id: number,
    name: string,
    status: string,
    followed: boolean,
    photos: IPhotosUser
}

export interface ISetUsersAction {
    type: typeof SET_USERS
    users: Array<IUser>
}

export interface IFollowUserAction {
    type: typeof FOLLOW_USER
    id: number | string
}

export interface IUnFollowUserAction {
    type: typeof UNFOLLOW_USER
    id: number | string
}

export interface ISetCurrentPage {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}

export interface ISetTotalCount {
    type: typeof SET_TOTAL_COUNT
    totalCount: number
}
export interface ISetIsFetching {
    type: typeof SET_IS_FETCHING
    isFetching: boolean
}
export interface ISetIsFollowingInProgress {
    type: typeof SET_IS_FOLLOWING_IN_PROGRESS
    isFetching: boolean
    id: number
}

export type FriendsCommonActionType = ISetUsersAction | IFollowUserAction | IUnFollowUserAction
    | ISetCurrentPage | ISetTotalCount | ISetIsFetching | ISetIsFollowingInProgress