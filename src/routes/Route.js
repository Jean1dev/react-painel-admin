import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { store } from '../redux'
import axios from '../service/api'

function setTokenOnApi(token) {
    if (token) {
        axios.defaults.headers['Authorization'] = `Bearer ${token}`
    }
}

export default function RouteWrapper({
    component: Component,
    isPrivate = false,
    ...rest
}) {
    const Layout = Component
    const signed = store.getState().auth.signed
    setTokenOnApi(store.getState().auth.token)

    if (!signed && isPrivate) {
        return <Redirect to="/"></Redirect>
    }

    if (signed && !isPrivate) {
        return <Redirect to="/dashboard"></Redirect>
    }

    return (
        <Route {...rest}
            render={props => (
                <Layout>
                    <Component {...props}></Component>
                </Layout>
            )}></Route>
    )
}