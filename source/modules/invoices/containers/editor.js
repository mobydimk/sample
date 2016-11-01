import React from 'react'
import { Link } from 'react-router'
import request from 'lib/request'
import Loader from 'components/loader'
import Form from '../components/form'
import Items from '../components/items'
import AddItem from '../components/add_item'

export default React.createClass({


    getInitialState: function() {
        return {
            is_fetching: false,
            data: {},
            items: [],
            products: {}
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
            .get('invoices/' + this.props.params.id)
            .then(data =>
                this.isMounted() && this.setState(
                    { data },
                    () => this.loadItems()
                )
            )
    },


    setData: function(data) {
        this.setState(
            { data: Object.assign({}, this.state.data, data) },
            () => this.saveData()
        )
    },

    setDiscount: function(discount) {
        discount = parseFloat(discount) || 0;
        discount = Math.min(discount, 100);
        discount = Math.max(discount, 0);
        var data = Object.assign({}, this.state.data, { discount });
        data.total = this.calculateTotal(data);
        this.setState(
            { data },
            () => this.saveData()
        )
    },

    saveData: function() {
        if(!this.state.data.customer_id) return;
        if(this.state.data.id) {
            request
                .put('invoices/' + this.state.data.id, this.state.data)
        } else {
            this.setState({ is_fetching: true });
            request
                .post('invoices', this.state.data)
                .then(data =>
                    this.setState({
                        data: Object.assign({}, this.state.data, { id: data.id }),
                        is_fetching: false
                    })
                )
        }
    },


    loadItems: function() {
        request
            .get('invoices/' + this.props.params.id + '/items')
            .then(items =>
                this.isMounted() && this.setState({ is_fetching: false, items})
            )
    },


    removeItem: function(id) {
        request
            .delete('invoices/' + this.state.data.id + '/items/' + id)
            .then(res=> {
                var items = this.state.items.filter(item=>item.id != id);
                this.setState(
                    { items },
                    () => {
                        var total = this.calculateTotal(this.state.data);
                        this.setData({ total });
                    }
                );
            })
    },


    addItem: function(item, product) {
        request
            .post('invoices/' + this.state.data.id + '/items', item)
            .then(new_item => {
                var items = this.state.items.slice(0);
                items.push(new_item);
                var products = Object.assign({[product.id]: product}, this.state.products);
                this.setState(
                    { items, products },
                    () => {
                        var total = this.calculateTotal(this.state.data);
                        this.setData({ total });
                    }
                )
            })
    },



    calculateTotal: function(data) {
        var total = 0;
        this.state.items.map(
            item => {
                total += parseFloat(this.state.products[item.product_id].price) * parseInt(item.quantity, 10)
            }
        );
        if(data.discount) {
            total -= total*data.discount/100;
        }
        return Math.max(0, total);
    },


    addProductCache: function(product) {
        this.setState({
            products: Object.assign({[product.id]: product}, this.state.products)
        })
    },


    render: function() {
        return (
            <Loader is_fetching={this.state.is_fetching}>
                <h2>{this.props.params.id == 'new' ? 'New invoice' : 'Edit invoice'}</h2>
                <section>
                    <Form data={this.state.data} setData={this.setData} setDiscount={this.setDiscount}/>
                </section>
                {this.state.data.id &&
                    <section>
                        <Items invoice_total={this.state.data.total} items={this.state.items} remove={this.removeItem} add={this.addItem}
                            products={this.state.products} addProductCache={this.addProductCache}/>
                        <AddItem add={this.addItem}/>
                    </section>
                }
            </Loader>
        )
    }

});