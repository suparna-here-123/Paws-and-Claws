import React, { useState, createContext } from 'react';

// this creates the context
export const UserContext = createContext();

// this is the provider which will give context to any component that subscribes / uses this provider function
// since i have wrapped the whole App component with this provider, any child can use it by just importing the UserContext component

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    return(
    
        // every subscriber will receive a 'user' and 'setUser' function from this provider, using which it can manipulate the 'user' values
        
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
