import React from 'react'
import { Link } from 'react-router'
import dataLoader from 'components/data_loader'
import Table from 'components/table'
import Row from '../components/row'

var Container = React.createClass({

    render: function() {
        return (
            <div>
                <section>
                    <Link to="/invoices/new" className="btn btn-default">New</Link>
                </section>
                <Table columns={['ID', 'Total', '']} rows_count={this.props.data.length}>
                    {this.props.data.map(item =>
                        <Row key={item.id} item={item}/>
                    )}
                </Table>
            </div>
        )
    }

});


export default dataLoader(
    Container,
    'invoices'
);