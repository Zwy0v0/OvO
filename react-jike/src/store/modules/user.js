import { createSlice } from "@reduxjs/toolkit";
import { request } from '@/utils'
import { setToken as _setToken,getToken,removeToken } from "@/utils"

const userStore = createSlice({
    name:"user",
    initialState:{
        token: getToken() || '',
        userInfo: {}
    },
    reducers:{
        setToken(state,action){
            state.token = action.payload
            //存本地
            _setToken(action.payload)
        },
        setUserInfo(state,action){
            state.userInfo = action.payload
        }
    }
})

const { setToken,setUserInfo } = userStore.actions

const userReducer = userStore.reducer

const fetchLogin = (loginForm) => {
    return async(dispatch) => {
        const res = await request.post('/authorizations',loginForm)
        dispatch(setToken(res.data.data.token))
    }
}

const fetchUserInfo = () => {
    return async(dispatch) => {
        const res = await request.get('/user/profile')
        dispatch(setUserInfo(res.data))
    }
}

export {fetchLogin,fetchUserInfo,setToken}
export default userReducer