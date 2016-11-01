import React from 'react'
import Navigation from '../components/navigation'

export default React.createClass({

    render: function() {
        return (
            <div>
                <Navigation/>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        )
    }
});