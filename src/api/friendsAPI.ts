import axios from 'axios';



const instance = axios.create ({
    withCredentials : true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0',
    headers: {
        'API-KEY': 'c14d0c2d-3d81-4b4a-a0b2-5dd2fbf6d146'
    }
});
export const friendsAPI = {
    getUsers (currentPage:number, count:number) {
        return instance.get(`/users?page=${currentPage}&count=${count}`)
},
    onPageChange (pageNumber:number, count:number) {
        return instance.get(`/users?page=${pageNumber}&count=${count}`)
    },
    befriendUser (userId: number) {
        return instance.post(`/follow/${userId}`)
    },
    stopFriendUser (userId: number) {
        return instance.delete(`/follow/${userId}`)
    }
};