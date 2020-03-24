import React, {useCallback, useEffect} from 'react';
import Users from "./Users";
import {useDispatch, useSelector} from "react-redux";
import {
    befriendUser,
    getUsers,
    onPageChanged,
    stopFriendUser
} from "../store/reducers/friendsReducer";
import {AppStateType} from "../store/store";
import Preloader from "./preloader/Preloader";

let UsersContainer = () => {

    const dispatch = useDispatch();
    const currentPage = useSelector((state:AppStateType) => state.friendsPage.currentPage);
    const count = useSelector((state:AppStateType) => state.friendsPage.count);
    const totalCount = useSelector((state: AppStateType) => state.friendsPage.totalUsersCount)
    useEffect(() => {
        dispatch(getUsers(currentPage, count))
    }, [dispatch]);
    const users = useSelector((state:AppStateType) => state.friendsPage.users);
    const isFetching = useSelector((state:AppStateType) => state.friendsPage.isFetching);
    const isFollowingInProgress = useSelector( (state:AppStateType) => state.friendsPage.isFollowingInProgress)

    const beFriend = useCallback((id: number) => {
        dispatch(befriendUser(id))
    }, [dispatch]);

    const stopFriend = useCallback((id: number) => {
        dispatch(stopFriendUser(id))
    }, [dispatch]);
    const onPageChange = useCallback((pageNumber: number) => {
        dispatch(onPageChanged(pageNumber, count))
    }, [dispatch]);




    return (
        <div>
            {isFetching && <Preloader/>}
            <Users isFollowingInProgress={isFollowingInProgress} onPageChange={onPageChange}
                   beFriend={beFriend} stopFriend={stopFriend} users={users}
                   totalCount={totalCount} count={count} currentPage={currentPage}/>
        </div>
    )
}

export default UsersContainer;