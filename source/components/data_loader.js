import React from 'react'
import request from 'lib/request'
import Loader from './loader'

export default function dataLoader(Component, url, params) {

    return React.createClass({
        getInitialState: function() {
            return {
                is_fetching: true,
                data: null
            }
        },

        componentDidMount: function() {
            this.setState(
                { is_fetching: true },
                () => request.get(url, params).then(res => this.isMounted() && this.onResponseSuccess(res))
            );
        },

        onResponseSuccess: function(data) {
            this.setState({
                is_fetching: false,
                data
            })
        },

        render: function() {
            return (
                <Loader is_fetching={this.state.is_fetching}>
                    <Component data={this.state.data} {...this.props}/>
                </Loader>
            )
        }
    })

}