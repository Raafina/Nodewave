import instance from "@/libs/axios/instance"
import { ILogin } from "@/types/Auth"

const authServices = {
    login: (payload: ILogin) => instance.post(`/login`, payload),
}

export default authServices;