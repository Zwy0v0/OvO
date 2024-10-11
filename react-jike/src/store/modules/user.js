import { createSlice } from "@reduxjs/toolkit";
import { request } from '@/utils'

const userStore = createSlice({
    name:"user",
    initialState:{
        token: localStorage.getItem('token_key') || ''
    },
    reducers:{
        setToken(state,action){
            state.token = action.payload
            //存本地
            localStorage.setItem('token_key',action.payload)
        }
    }
})

const { setToken } = userStore.actions

const userReducer = userStore.reducer

const fetchLogin = (loginForm) => {
    return async(dispatch) => {
        const res = await request.post('/authorizations',loginForm)
        dispatch(setToken(res.data.data.token))
    }
}

export {fetchLogin,setToken}
export default userReducer