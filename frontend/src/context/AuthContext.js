import React, { createContext, useState, useEffect} from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { variables } from "../Variables.js";


const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {

    
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    const navigate = useNavigate()

    let loginUser = async (e ) => {
        e.preventDefault()
        let response = await fetch((variables.API_URL + 'token/'), {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        if (response.status === 200 ){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate("/")
        }else{
            alert("Oops something went wrong!")
        }
    }

    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate("/login")
    }

    let contextData = {
        user:user,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    return(
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
};