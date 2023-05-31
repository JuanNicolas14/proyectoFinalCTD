import React, { createContext, useState } from 'react'

export const AppContext = createContext()

export const AppProvider = ({children}) => {
    const [userJwt, setUserJwt] = useState({
      id: null,
      nombre:'',
      apellido:'',
      email:'',
      password:'',
      rol:'',
      jwt:null,
    });

  return (
    <AppContext.Provider value={{ userJwt, setUserJwt }}>
      {children}
    </AppContext.Provider>
  )
}