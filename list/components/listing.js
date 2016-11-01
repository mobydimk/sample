import React from 'react'
import { getStore } from 'lib/store'
import { showListingDetails } from 'modules/layout/actions'

export default React.createClass({


    getInitialState: function() {
        return {
            icon_visible: false
        }
    },

    onClick: function() {
        getStore().dispatch(showListingDetails(this.props.listing.id));
    },


    componentDidMount: function() {
        this.updateIconVisibility(this.props);
    },

    componentWillReceiveProps: function(props) {
        this.updateIconVisibility(props);
    },


    updateIconVisibility: function(props) {
        if(this.state.icon_visible) return;
        var top = this.refs.listing.offsetTop,
            bottom = this.refs.listing.offsetTop + this.refs.listing.offsetHeight;
        if(bottom >= props.viewport.top && top <= props.viewport.bottom) {
            this.setState({ icon_visible: true});
        }
    },

    render: function() {
        var
            l = this.props.listing,
            listing_style = {},
            icon_style = {};
        if(this.state.icon_visible && l.icon) icon_style.background = 'url(' + l.icon + ')'
        if(l.fg_color) listing_style.color = l.fg_color;
        if(l.bg_color) listing_style.backgroundColor = l.bg_color;
        return (
            <div className="listing" style={listing_style} onClick={this.onClick} ref="listing">
                <div className="icon" style={icon_style}/>
                <div className="info">
                    <div className="name">{l.name}</div>
                    <div className="badge">{l.distance}</div>
                </div>
            </div>
        )
    }

});