import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function RouteWrapper({
    component: Component,
    isPrivate = false,
    ...rest
}) 
{
    const signed = false

    if (!signed && isPrivate) {
        return <Redirect to="/"></Redirect>
    }

    if (signed && !isPrivate) {
        return <Redirect to="/dashboard"></Redirect>
    }

    const Layout = Component

    return (
        <Route {...rest}
        render={props => (
            <Layout>
                <Component {...props}></Component>
            </Layout>
        )}></Route>
    )
}