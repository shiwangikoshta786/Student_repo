import React from 'react';

import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ component: Component, ...rest }) {
    const isAuthenticated = localStorage.getItem('AUTH_DATA');  

    return (
        <Route
            {...rest}
            render={props => 
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/" />
                )
            }
        />
    );
}

export default ProtectedRoute;