import { Navigate } from "react-router-dom";
const { getToken } = require("@/utils");

//根据token判断跳转
export function AuthRoute ({ children }){
    const token = getToken()
    if (token){
        return <>{children}</>
    } else {
        return <Navigate to={'/login'}/>
    }
}