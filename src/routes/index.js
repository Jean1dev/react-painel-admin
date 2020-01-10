import React from 'react'
import { Switch, BrowserRouter } from 'react-router-dom'
import Route from './Route'

import Login from '../views/Login'
import Register from '../views/Register'
import Dashboard from '../views/Dashboard'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}></Route>
                <Route path="/register" exact component={Register}></Route>
                <Route path="/dashboard" exact component={Dashboard}></Route>

                <Route path="/" component={() => <h1>404 not Found</h1>}></Route>
            </Switch>
        </BrowserRouter>
    )
}