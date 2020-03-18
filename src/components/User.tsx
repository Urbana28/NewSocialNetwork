import React from 'react';
import avatar from '../img/user.svg'
import '../styles/friends.scss'
import {IPhotosUser} from "../types/friendsTypes";
import friendIcon from '../img/bookmark.svg'

interface IProps {
    id: number,
    name: string,
    followed: boolean,
    photos: IPhotosUser,
    totalCount: number,
    count: number,
    currentPage: number
    stopFriend: (id: number) => void,
    beFriend: (id: number) => void,
    isFollowingInProgress: Array<number>
}

let User: React.FC<IProps> = ({id, name, followed, photos, stopFriend, beFriend, isFollowingInProgress}) => {
    return (
        <div className='user' key={id}>
            <div className='user__one'>
                <div className='user__one--photo'><img src={photos.small == null ? avatar : photos.small}/></div>
                {followed && <div className='user__one--friendMark'><img src={friendIcon} alt=""/></div>}
                <div className='user__one--info'>
                    <div className='user__one--info-name'>{name}</div>
                </div>
            </div>
            <div className='user__buttons'>
                {!followed ? <div className='user__buttons--btn'>
                        <button disabled={isFollowingInProgress.some(userId => userId === id)} onClick={() => beFriend(id)}>Добавить в друзья</button>
                    </div> :
                    <div className='user__buttons--btn'>
                        <button disabled={isFollowingInProgress.some(userId => userId === id)} onClick={() => stopFriend(id)}>Удалить из друзей</button>
                    </div>}
                <div className='user__buttons--btn'>
                    <button>Просмотреть профиль</button>
                </div>
                <div className='user__buttons--btn'>
                    <button>Написать сообщение</button>
                </div>
            </div>
        </div>
    )
};

export default User;