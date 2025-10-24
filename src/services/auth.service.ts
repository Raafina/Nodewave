import instance from "@/libs/axios/instance"
import endpoint from "./endpoint.constant"
import { ILogin } from "@/types/Auth"

const authServices = {
    login: (payload: ILogin) => instance.post(`/login`, payload),
    getProfileWithToken: (token: string) =>
        instance.get(`${endpoint.AUTH}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
    getProfile: () =>
        instance.get(`${endpoint.AUTH}/me`, {}),
}

export default authServices;