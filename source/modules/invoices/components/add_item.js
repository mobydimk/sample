import React from 'react'
import Loader from 'components/loader'
import request from 'lib/request'

var Display = function(props) {
    return (
        <div className="btn-group">
            <a className="btn btn-default" onClick={()=>props.setView('select')}>Add existing product</a>
            <a className="btn btn-default" onClick={()=>props.setView('new')}>Add new product</a>
        </div>
    )
}



var Select = React.createClass({

    getInitialState: function() {
        return {
            is_fetching: true,
            product_id: null,
            quantity: 1,
            data: []
        }
    },

    componentWillMount: function() {
        request
            .get('products')
            .then(
                (data) => this.isMounted() && this.setState({ is_fetching: false, data})
            )
    },

    setProduct: function() {
        var product = this.state.data.find(product=>product.id == this.state.product_id);
        this.props.add(
            { product_id: product.id, quantity: this.state.quantity },
            product
        );
    },

    render: function() {
        return (
            <Loader is_fetching={this.state.is_fetching}>
                <div className="row">
                    <div className="form-group col-sm-6">
                        <label>Select product</label>
                        <select className="form-control" onChange={(e)=>this.setState({ product_id: e.target.value})} value={this.state.product_id}>
                            <option>...</option>
                            { this.state.data.map(item => <option key={item.id} value={item.id}>{item.name}</option>) }
                        </select>
                    </div>
                    <div className="form-group col-sm-2">
                        <label>Qty</label>
                        <input type="text" className="form-control" onChange={(e)=>this.setState({ quantity: e.target.value})} value={this.state.quantity}/>
                    </div>
                    <div className="form-group col-sm-4">
                        <label>Action</label>
                        <div className="btn-group btn-group-justified">
                            <a className="btn btn-default" type="button" onClick={this.setProduct}>Ok</a>
                            <a className="btn btn-default" type="button" onClick={this.props.cancel}>Cancel</a>
                        </div>
                    </div>
                </div>
            </Loader>
        )
    }
})



var New = React.createClass({

    getInitialState: function() {
        return {
            is_fetching: false,
            name: '',
            price: '',
            quantity: 1
        }
    },


    create: function() {
        this.setState(
            { is_fetching: true },
            () => request
                .post('products', { name: this.state.name, price: this.state.price })
                .then(data =>{
                    this.props.add(
                        { product_id: data.id, quantity: this.state.quantity },
                        data
                    );
                })
        )
    },

    render: function() {
        var ok_disabled = this.state.name == '' || !this.state.price || !this.state.quantity;
        return (
            <Loader is_fetching={this.state.is_fetching}>
                <div className="row">
                    <div className="form-group col-sm-4">
                        <label>Product name</label>
                        <input type="text" className="form-control" onChange={(e)=>this.setState({ name: e.target.value})} value={this.state.name}/>
                    </div>
                    <div className="form-group col-sm-2">
                        <label>Price</label>
                        <input type="text" className="form-control" onChange={(e)=>this.setState({ price: e.target.value})} value={this.state.price} />
                    </div>
                    <div className="form-group col-sm-2">
                        <label>Qty</label>
                        <input type="text" className="form-control" onChange={(e)=>this.setState({ quantity: e.target.value})} value={this.state.quantity}/>
                    </div>
                    <div className="form-group col-sm-4">
                        <label>Action</label>
                        <div className="btn-group btn-group-justified">
                            <a className="btn btn-default" onClick={this.create} disabled={ok_disabled}>Create &amp; add</a>
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
            view: 'display'
        }
    },


    add: function(item, product) {
        this.setState(
            { view: 'display' },
            () => this.props.add(item, product)
        )
    },

    render: function() {
        return (
            <div>
                {{
                    display: <Display setView={(view) => this.setState({view})}/>,
                    select: <Select cancel={() => this.setState({view: 'display'})} add={this.add}/>,
                    new: <New cancel={() => this.setState({view: 'display'})} add={this.add}/>,
                }[this.state.view]}
            </div>
        )
    }
});