import React from 'react'
import request from 'lib/request'
import Price from 'components/price'





var Row = React.createClass({

    getInitialState: function() {
        return {
            is_fetching: false
        }
    },

    componentWillMount: function() {
        if(this.props.product) return;
        this.setState(
            { is_fetching: true},
            () => request
                .get('products/' + this.props.item.product_id)
                .then(product=>{
                    if(!this.isMounted()) return;
                    this.props.addProductCache(product);
                    this.setState({ is_fetching: false })
                })
        )
    },


    render: function() {
        if(this.state.is_fetching) {
            return (
                <tr><td colSpan={4}>Loading...</td></tr>
            )
        }
        return (
            <tr>
                <td>{this.props.product.name}</td>
                <td>{this.props.item.quantity}</td>
                <td>
                    <Price value={parseFloat(this.props.product.price) * parseFloat(this.props.item.quantity)}/>
                </td>
                <td>
                    <a className="btn btn-xs btn-default" onClick={()=>this.props.remove(this.props.item.id)}>Remove</a>
                </td>
            </tr>
        )
    }

});

export default React.createClass({

    render: function() {
        return (
            <div>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                        {this.props.items.map(item=>
                            <Row key={item.id} item={item} product={this.props.products[item.product_id]}
                                remove={this.props.remove} addProductCache={this.props.addProductCache}/>
                        )}
                        <tr>
                            <th/>
                            <th>Total</th>
                            <th>
                                <Price value={this.props.invoice_total}/>
                            </th>
                            <th/>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
});