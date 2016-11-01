import React from 'react'
import { connect } from 'react-redux'

import Waypoint from 'react-waypoint'
import request from 'lib/request'
import Spinner from 'components/spinner'
import Listing from '../components/listing'


var scroll_timeout, on_scroll_delay = 600;

var Component = React.createClass({

    getInitialState: function () {
        return {
            is_fetching: true,
            has_more: true,
            offset: 0,
            data: [],
            filter_token: this.props.filter.token,
            viewport: {
                top: 0,
                bottom: 0
            }
        }
    },

    loadData: function(props) {
        var token = Math.random();
        var state = {
            is_fetching: true,
            token
        }
        this.setState(state)
        var p = Object.assign({
            offset: this.state.offset,
            token: token
        }, this.props.filter.plain);
        request.get('list', p).then(
            data => this.isMounted() && this.setData(data)
        );
    },

    setData: function(data) {
        if(data.token != this.state.token) return;
        var state = {
            is_fetching: false,
            data: this.state.data.concat(data.listings),
            offset: this.state.offset + data.listings.length,
            has_more: data.listings.length > 0
        }
        this.setState(state);
        this.updateViewport();
    },




    updateViewport: function() {
        clearTimeout(scroll_timeout);
        scroll_timeout = setTimeout(() => { this.setViewportState() }, on_scroll_delay);
    },

    setViewportState: function() {
        this.setState({
            viewport: {
                top: this.refs.list.scrollTop,
                bottom: this.refs.list.scrollTop + this.refs.list.offsetHeight
            }
        });
    },


    componentDidMount: function() {
        window.addEventListener('resize', this.updateViewport);
        this.refs.list.addEventListener('scroll', this.updateViewport);
        this.loadData(this.props);
    },

    componentWillUnmount: function() {
        clearTimeout(scroll_timeout);
        window.removeEventListener('resize', this.updateViewport);
        this.refs.list.removeEventListener('scroll', this.updateViewport);
    },

    componentWillReceiveProps(props) {
        if(props.filter.token != this.state.filter_token) {
            var s = {
                offset: 0,
                data: [],
                is_fetching: true,
                has_more: true,
                filter_token: props.filter.token
            }
            this.setState(s, () => this.loadData(props));
        }
    },


    loadMore: function(page) {
        this.loadData(this.props);
    },


    render: function() {
        return (
            <div className="listings-list" ref="list" onScroll={this.updateViewport}>
                { this.state.data.length > 0 ?
                    this.state.data.map(item=>
                        <Listing key={item.id} listing={item} viewport={this.state.viewport}/>
                    )
                    :
                    (!this.state.has_more && <div>Sorry, nothing found</div>)
                }
                { this.state.is_fetching ?
                    <Spinner block="true"/>
                    :
                    (this.state.has_more && <Waypoint onEnter={this.loadMore}/>)
                }
            </div>
        )
    }

})

function state2props(state) {
    return {
        filter: state.filter
    }
}

export default connect(
  state2props
)(Component)