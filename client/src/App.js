import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { useAuth } from './hooks/auth.hook'
import { AuthContext } from './context/AuthContext'
import { useRoutes } from './routes'
import { MyNavbar } from './components/Navbar'

function App() {

  const { token, login, logout, userId } = useAuth()

  const isAuthenticated = !!token

  const routes = useRoutes(isAuthenticated)

  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAuthenticated
    }}>
      <BrowserRouter>
        {isAuthenticated && <MyNavbar />}
        {routes}
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
