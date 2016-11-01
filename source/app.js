require('es6-promise').polyfill()

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRedirect } from 'react-router'
import { getHistory } from 'lib/history'

import layout from 'modules/layout'
import error_pages from 'modules/error_pages'
import invoices from 'modules/invoices'
import customers from 'modules/customers'
import products from 'modules/products'


ReactDOM.render((
    <Router history={getHistory()}>
        <Route path="/" component={layout.components.Layout}>
            <IndexRedirect to="/invoices"/>
            {invoices.routes}
            {customers.routes}
            {products.routes}
            {error_pages.routes}
        </Route>
    </Router>
), document.getElementById('app'))