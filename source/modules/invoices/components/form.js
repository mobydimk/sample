import React from 'react'
import Customer from './customer'

export default React.createClass({

    render: function() {
        return (
            <div>
                <Customer onChange={(customer_id) => this.props.setData({ customer_id })} customer_id={this.props.data.customer_id}/>
                { this.props.data.id &&
                    <div className="form-group">
                        <label className="control-label">Discount</label>
                        <input className="form-control" type="text" onChange={(e) => this.props.setDiscount(e.target.value)} value={this.props.data.discount}/>
                    </div>
                }
            </div>
        )
    }
});