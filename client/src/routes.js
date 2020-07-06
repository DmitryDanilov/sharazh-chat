import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AuthPage from './pages/AuthPage'
import ChatPage from './pages/ChatPage'

export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path='/chat' exact>
                    <ChatPage />
                </Route>
                <Redirect to="/chat" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path='/' exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}