import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import DefaultLayout from '../_layouts/default'
import AuthLayout from '../_layouts/auth'
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
    const signed = store.getState().auth.signed
    const Layout = signed ? DefaultLayout : AuthLayout
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