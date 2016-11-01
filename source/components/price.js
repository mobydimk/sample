import React from 'react'

export default React.createClass({

    render: function() {
        var v = parseFloat(this.props.value);
        return (
            <span>{v >= 0 ? '$' + v : 'n/a'}</span>
        )
    }

})