import React from 'react'
import request from 'lib/request'
import Loader from 'components/loader'
import Form from '../components/form'

export default React.createClass({

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },


    getInitialState: function() {
        return {
            is_fetching: false,
            data: {}
        }
    },


    componentWillMount: function() {
        if(this.props.params.id != 'new') {
            this.setState(
                { is_fetching: true },
                () => this.loadData()
            )
        }
    },


    loadData: function() {
        request
            .get('customers/' + this.props.params.id)
            .then(data =>
                this.isMounted() && this.setState({ is_fetching: false, data})
            )
    },


    submit: function() {
        this.setState(
            { is_fetching: true },
            () => this.saveData(this.state.data)
        )
    },


    setData: function(data) {
        this.setState({ data: Object.assign({}, this.state.data, data) })
    },


    saveData: function(data) {
        if(this.props.params.id == 'new') {
            request
                .post('customers', data)
                .then(() => this.onSaved())
        } else {
            request
                .put('customers/' + this.props.params.id, data)
                .then(() => this.onSaved())
        }
    },


    onSaved: function() {
        if(this.isMounted()) {
            this.context.router.push('/customers');
        }
    },



    render: function() {
        return (
            <Loader is_fetching={this.state.is_fetching}>
                <h2>{this.props.params.id == 'new' ? 'New customer' : 'Edit customer'}</h2>
                <section>
                    <Form submit={this.submit} data={this.state.data} setData={this.setData}/>
                </section>
            </Loader>
        )
    }

});