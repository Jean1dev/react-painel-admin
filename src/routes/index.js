import React from 'react'
import { Switch } from 'react-router-dom'
import Route from './Route'

import Login from '../views/Login'
import Register from '../views/Register'
import Dash from '../views/Dash'
// import Solicitacao from '../views/Solicitacoes'

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={Login}></Route>
            <Route path="/register" exact component={Register}></Route>
            <Route path="/dashboard" isPrivate exact component={Dash}></Route>
            <Route path="/solicitacao" isPrivate exact component={Dash}></Route>

            <Route path="/" component={() => <h1>404 not Found</h1>}></Route>
        </Switch>
    )
}