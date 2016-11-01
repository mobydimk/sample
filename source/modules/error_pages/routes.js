import React from 'react'
import { Route } from 'react-router'

import NotFound from './containers/not_found.js'
import ServerError from './containers/server_error.js'

export default (
    <Route>
        <Route path="/server-error" component={ServerError}/>
        <Route path="*" component={NotFound} />
    </Route>
)