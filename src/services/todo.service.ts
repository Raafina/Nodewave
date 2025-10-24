import instance from "@/libs/axios/instance"
import { ITodo, ITodoUpdatePayload } from "@/types/Todo"
import endpoint from "./endpoint.constant";

const todoServices = {
    getTodos: (params?: string) => instance.get(`${endpoint.TODO}?${params}`),
    addTodo: (payload: ITodo) =>
        instance.post(endpoint.TODO, payload),
    deleteTodo: (id: string) => instance.delete(`${endpoint.TODO}/${id}`),
    updateTodo: (id: string, payload: ITodoUpdatePayload) =>
        instance.put(`${endpoint.TODO}/${id}/mark`, payload),
}

export default todoServices;