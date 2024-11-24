import { createContext, useState } from "react";
export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
      const userInfo = localStorage.getItem('userInfo');
      const[user, setUser] = useState(userInfo);

      const login = (user) => {
        setUser(user);

      }

      const logout = () => {
        localStorage.removeItem('userInfo');
        setUser(null);
      }

      return(
        <AuthContext.Provider value={{ 
            user,
            login,
            logout
         }}>
            {children}

        </AuthContext.Provider>
      )
} 