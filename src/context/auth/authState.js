import React, { useContext, useState } from 'react';
import AuthContext from './authContext';


const AuthState = (props) => {
  const host = "http://localhost:5000";
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [responeFromServer, setresponeFromServer] = useState("")
  const [responeFromServerSignUp, setresponeFromServerSignUp] = useState("")
  const [UserName, setUserName] = useState("")
  
 


  const login = async (email, password) => {
    try {
      const response = await fetch(`${host}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        setresponeFromServer(response)
        const data = await response.json();
        const token = data.token; 
        setUserName(data.name)
        localStorage.setItem('authToken', token);
        
        
        
        
  
       
      } else {
        // Handle login failure here
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure here
    }
  };
  
  const signup = async (email, password,name) => {
    try {
      
      const response = await fetch(`${host}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password ,name }),
      });
  
      if (response.ok) {
        setresponeFromServerSignUp(response)
        
      } else {
      
        console.error("Signup failed:", response);
      }
    } catch (error) {
      console.error("Signup failed:", error);

    }
  };
  

 

  return (
    <AuthContext.Provider
      value={{
        email,
        password,
        login,
        signup,
        setEmail,
        setPassword,
        signup,
        responeFromServer,
        setName,
        name,
        responeFromServerSignUp,
        UserName
       
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
