import React from 'react'
import { Route, IndexRoute } from 'react-router'
import List from './containers/list'
import Editor from './containers/editor'

export default (
    <Route path="/invoices">
        <IndexRoute component={List}/>
        <Route path=":id" component={Editor}/>
    </Route>
)