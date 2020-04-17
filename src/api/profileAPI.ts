import axios from 'axios';
import {IProfile} from "../types/profileTypes";

const instance = axios.create ({
    withCredentials : true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        'API-KEY': 'c14d0c2d-3d81-4b4a-a0b2-5dd2fbf6d146'
    }
});


export const profileApi = {
    getProfile (userId: string) {
        return instance.get(`/profile/${+userId}`)
    },
    getStatus (userId: string) {
         return instance.get(`/profile/status/${+userId}`)
    },
    updateStatus(status:string) {
        return instance.put('/profile/status', {status})
    },
    updateProfileInfo(profile: IProfile) {
        return instance.put('/profile', {...profile, lookingForAJob: !!profile.lookingForAJob})
    }
}