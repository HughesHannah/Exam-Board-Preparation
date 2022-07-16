import React, { createContext, useState, useEffect} from 'react';
import jwt_decode from 'jwt-decode';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(null)
    let [user, setUser] = useState(null)

    let loginUser = async (e ) => {
        e.preventDefault();
        let response = await fetch(variables.API_URL + "token", { 
            method: 'POST', 
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        let data = await response.json()
        if (response.status === 200 ){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
        }else{
            alert("Oops something went wrong!")
        }
    }

    let contextData = {
        user:user,
        loginUser: loginUser,
    }

    return(
        <AuthContext.Provider value={contextData} >
            {children}
        </AuthContext.Provider>
    )
};