import React from 'react'
import Loader from 'components/loader'
import request from 'lib/request'

var DisplayCustomer = function(props) {
    return (
        <div className="row">
            <div className="form-group col-sm-6">
                <label>Customer</label>
                <p className="form-control-static">
                    { props.customer ? props.customer.name : 'Not assigned'  }
                </p>
            </div>
            <div className="form-group col-sm-6">
                <div className="btn-group btn-group-justified">
                    <a className="btn btn-default" onClick={()=>props.setView('select')}>Select existing customer</a>
                    <a className="btn btn-default" onClick={()=>props.setView('new')}>Add new customer</a>
                </div>
            </div>
        </div>
    )
}



var SelectCustomer = React.createClass({

    getInitialState: function() {
        return {
            is_fetching: true,
            customer_id: this.props.customer ? this.props.customer.id : null,
            data: []
        }
    },

    componentWillMount: function() {
        request
            .get('customers')
            .then(
                (data) => this.isMounted() && this.setState({ is_fetching: false, data})
            )
    },

    setCustomer: function() {
        var customer = this.state.data.find(customer=>customer.id == this.state.customer_id);
        this.props.setCustomer(customer);
    },

    render: function() {
        return (
            <Loader is_fetching={this.state.is_fetching}>
                <div className="row">
                    <div className="form-group col-sm-8">
                        <label>Select customer</label>
                        <select className="form-control" onChange={(e)=>this.setState({ customer_id: e.target.value})} value={this.state.customer_id}>
                            <option>...</option>
                            { this.state.data.map(customer => <option key={customer.id} value={customer.id}>{customer.name}</option>) }
                        </select>
                    </div>
                    <div className="form-group col-sm-4">
                        <label>Action</label>
                        <div className="btn-group btn-group-justified">
                            <a className="btn btn-default" onClick={this.setCustomer}>Ok</a>
                            <a className="btn btn-default" onClick={this.props.cancel}>Cancel</a>
                        </div>
                    </div>
                </div>
            </Loader>
        )
    }
})



var NewCustomer = React.createClass({

    getInitialState: function() {
        return {
            is_fetching: false,
            name: ''
        }
    },


    createCustomer: function() {
        this.setState(
            { is_fetching: true },
            () => request
                .post('customers', { name: this.state.name })
                .then(data =>
                    this.isMounted() && this.props.setCustomer(data)
                )
        )
    },

    render: function() {
        return (
            <Loader is_fetching={this.state.is_fetching}>
                <div className="row">
                    <div className="form-group col-sm-8">
                        <label>Customer name</label>
                        <input type="text" className="form-control" onChange={(e)=>this.setState({ name: e.target.value})} value={this.state.name} placeholder="Enter customer name"/>
                    </div>
                    <div className="form-group col-sm-4">
                        <label>Action</label>
                        <div className="btn-group btn-group-justified">
                            <a className="btn btn-default" onClick={this.createCustomer} disabled={this.state.name == ''}>Ok</a>
                            <a className="btn btn-default" onClick={this.props.cancel}>Cancel</a>
                        </div>
                    </div>
                </div>
            </Loader>
        )
    }
})



export default React.createClass({

    getInitialState: function() {
        return {
            is_fetching: false,
            view: 'display',
            customer: null
        }
    },

    componentWillMount: function() {
        if(this.props.customer_id) {
            this.loadData(this.props.customer_id);
        }
    },

    loadData: function(customer_id) {
        request
            .get('customers/' + customer_id)
            .then(customer =>
                this.isMounted() && this.setState({ is_fetching: false, customer})
            )
    },


    setCustomer: function(customer) {
        this.setState(
            { view: 'display', customer },
            () => this.props.onChange(customer.id)
        )
    },

    render: function() {
        return (
            <Loader is_fetching={this.state.is_fetching}>
                {{
                    display: <DisplayCustomer customer={this.state.customer} setView={(view) => this.setState({view})}/>,
                    select: <SelectCustomer customer={this.state.customer} cancel={() => this.setState({view: 'display'})} setCustomer={this.setCustomer}/>,
                    new: <NewCustomer customer={this.state.customer} cancel={() => this.setState({view: 'display'})} setCustomer={this.setCustomer}/>,
                }[this.state.view]}
            </Loader>
        )
    }
});