import { commonAPI } from "./commonAPI"
import { SERVER_URL } from './serverUrl'


// Register
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/user/register`, reqBody, "")
}

// login
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVER_URL}/user/login`, reqBody, "")
}

// get todo 
export const getTodoAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/todo/get`, "", reqHeader)
}

// add Todo
export const addTodoAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST",`${SERVER_URL}/todo/add`,reqBody,reqHeader)
} 

// edit todo
export const editTodoAPI = async (id, reqBody,reqHeader) => {
    return await commonAPI("PUT",`${SERVER_URL}/todo/edit/${id}`,reqBody,reqHeader)
}

// delete todo api
export const deleteTodoAPI = async (id) => {
    return await commonAPI("DELETE",`${SERVER_URL}/todo/delete/${id}`,{},"")
}