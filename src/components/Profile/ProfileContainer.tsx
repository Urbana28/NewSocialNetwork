import React, {useEffect, useState} from 'react';
import ProfilePage from "./ProfilePage";
import {getProfile, getStatus, updateStatus} from "../../store/reducers/profileReducers";
import {useDispatch, useSelector} from "react-redux";
import { withRouter } from 'react-router-dom';
import {AppStateType} from "../../store/store";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {IProfile} from "../../types/profileTypes";

const ProfileContainer = (props:any) => {

    const [editMode, setEditMode] = useState(false);
    let dispatch = useDispatch();
    let profile: IProfile = useSelector((state:AppStateType) => state.profilePage.profile)
    let isFetching = useSelector((state:AppStateType) => state.friendsPage.isFetching)
    let status = useSelector((state:AppStateType) => state.profilePage.status)
    let userId = props.match.params.userId;
    if(!userId) {
        userId = 4919
    };

    useEffect(() => {
        dispatch(getProfile(userId))
        dispatch(getStatus(userId))
    }, [dispatch]);




    return(
        <div>
            <ProfilePage isOwner={props.match.params.userId} status={status} isFetching={isFetching}
                         profile={profile} editMode={editMode} setEditMode={setEditMode}/>
        </div>
    )
};


let withRouterProfileContainer = withAuthRedirect(ProfileContainer);
export default withRouter(withRouterProfileContainer)
