import axios, * as others from 'axios';

const instance = axios.create({
    withCredentials : true,
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    headers : {
        "API-KEY": "d97005e2-e63d-414c-910b-7c582882782f"
    }
})

export const usersAPI = {
    async getUsers (pageNumber = 1, pageSize = 10) {
    const response = await instance.get(`users?page=${pageNumber}&count=${pageSize}`);
        return response.data;
    },

    async setUnfolow (id) {
    const response = await instance.delete(`follow/${id}`);
        return response.data;
    },

    async setFolow (id) {
    const response = await instance.post(`follow/${id}`, {});
        return response.data;
    },

    async getFollowedUsers (pageNumber = 1, pageSize = 6) {
        const response = await instance.get(`users?friend=true&count=${pageSize}&page=${pageNumber}`);
            return response.data;
        },


}

export const authAPI = {
    async getAuth () {
        const response = await instance.get(`auth/me`);
        return response.data;
    },

    async login (email, password, rememberMe=false, captcha) {
        const response = await instance.post('auth/login', { email, password, rememberMe, captcha });
        return response.data;
    },

    async logout () {
        const response = await instance.delete('auth/login');
        return response.data;
    },

    async getCaptcha () {
        const response = await instance.get('security/get-captcha-url');
        return response.data;
    },

}

export const profileAPI = {
    async getProfile (userId) {
        const response = await instance.get(`profile/${userId}`);
        return response.data;
    },

    async getStatus (userId) {
        const response = await instance.get(`profile/status/${userId}`);
        return response.data;
    },

    async updateStatus (status) {
        const response = await instance.put(`profile/status`, { status: status });
        return response.data;
    },

    async updatePhoto (file) {
        const formData = new FormData()
        formData.append("image", file)
        const response = await instance.put(`profile/photo`, formData, { headers: {'Content-Type': 'multipart/form-data'}});
        return response.data;
    },

    async updateProfile (profile) {
        const response = await instance.put(`profile`, profile);
        return response.data;
    },

}
