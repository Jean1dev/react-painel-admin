import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { store } from '../redux'

export default function RouteWrapper({
    component: Component,
    isPrivate = false,
    ...rest
}) {
    const Layout = Component
    const signed = store.getState().auth.signed
    
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