import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { Create } from './pages/Create'
import { Details } from './pages/Details'
import { Links } from './pages/Links'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/links" exact>
                    <Links />
                </Route>
                <Route path="/create" exact>
                    <Create />
                </Route>
                <Route path="/detail.:id" exact>
                    <Details />
                </Route>
                <Redirect to="/create" />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )

}