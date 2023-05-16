import axios, * as others from 'axios';
import { PhotosType, ProfileType, UsersDataType } from '../types/types';

const instance = axios.create({
    withCredentials : true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers : {
        "API-KEY": "d97005e2-e63d-414c-910b-7c582882782f"
    }
})

export const usersAPI = {
    async getUsers (pageNumber: number = 1, pageSize: number = 10) {
    const response = await instance.get<UsersGetResponseType>(`users?page=${pageNumber}&count=${pageSize}`);
        return response.data;
    },

    async setUnfolow (id: number) {
    const response = await instance.delete<ResponseType>(`follow/${id}`);
        return response.data;
    },

    async setFolow (id: number) {
    const response = await instance.post<ResponseType>(`follow/${id}`, {});
        return response.data;
    },

    async getFollowedUsers (pageNumber: number = 1, pageSize: number = 6) {
        const response = await instance.get<UsersGetResponseType>(`users?friend=true&count=${pageSize}&page=${pageNumber}`);
            return response.data;
        },
}

export const authAPI = {
    async getAuth () {
        const response = await instance.get<ResponseType<AuthMeResponseDataType, ResultCodeEnum>>(`auth/me`);
        return response.data;
    },

    async login (email:string, password: string, rememberMe=false, captcha: null | string = null) {
        const response = await instance.post<ResponseType<AuthLoginResponseDataType, ResultCodeEnum | ResultCodeForCaptchaEnum>>('auth/login', { email, password, rememberMe, captcha });
        return response.data;
    },

    async logout () {
        const response = await instance.delete<ResponseType>('auth/login');
        return response.data;
    },

    async getCaptcha () {
        const response = await instance.get<SecurityCaptchaGetResponseType>('security/get-captcha-url');
        return response.data;
    },
}

export const profileAPI = {
    async getProfile (userId: number | null) {
        const response = await instance.get<ProfileType>(`profile/${userId}`);
        return response.data;
    },

    async getStatus (userId: number | null) {
        const response = await instance.get<string>(`profile/status/${userId}`);
        return response.data;
    },

    async updateStatus (status: string) {
        const response = await instance.put<ResponseType>(`profile/status`, { status: status });
        return response.data;
    },

    async updatePhoto (file: File) {
        const formData = new FormData()
        formData.append("image", file)
        const response = await instance.put<ResponseType<PhotosType, ResultCodeEnum | number>>(`profile/photo`, formData, { headers: {'Content-Type': 'multipart/form-data'}});
        return response.data;
    },

    async updateProfile (profile: Omit<ProfileType, "photos">) {
        const response = await instance.put<ResponseType>(`profile`, profile);
        return response.data;
    },
}

// Types

export enum CommonResultCodeEnum {
    Success = 0
}
export enum ResultCodeEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

type ResponseType<D = {}, RC = CommonResultCodeEnum | number> = {
    data: D
    resultCode: RC
    messages: Array<string>
}

type UsersGetResponseType = {
    items: Array<UsersDataType>
    totalCount: number
    error: string
}

type AuthMeResponseDataType = {
    id: number
    email: string
    login: string   
}

type AuthLoginResponseDataType = {
    userId: number
}

type SecurityCaptchaGetResponseType = {
    url: string
}