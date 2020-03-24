import React, { useState } from 'react';
import User from "./User";
import {IUser} from '../types/friendsTypes';
import '../styles/friends.scss'
import Pagination from "./Pagination";

interface IProps {
    users: Array<IUser>,
    totalCount: number,
    count: number,
    currentPage: number
    stopFriend: (id: number) => void,
    beFriend: (id: number) => void,
    onPageChange: (pageNumber: number) => void,
    isFollowingInProgress: Array<number>
}

let Users: React.FC<IProps> = ({users, totalCount, count, currentPage,
                                   stopFriend, beFriend, onPageChange, isFollowingInProgress}) => {


    return (
        <div className='users'>
            <div>
              <Pagination  totalCount={totalCount} count={count} currentPage={currentPage} onPageChange={onPageChange}/>
            </div>
            {users.map(u => <User isFollowingInProgress={isFollowingInProgress} beFriend={beFriend} stopFriend={stopFriend}
                                  totalCount={totalCount} count={count} currentPage={currentPage}
                                  key={u.id} id={u.id} name={u.name} followed={u.followed} photos={u.photos}/>)}
        </div>
    )
};


export default Users;
