import React from 'react'

export default React.createClass({

    render: function() {
        return <div>{ this.props.is_fetching ? 'Fetching...' : this.props.children }</div>
    }

})