import React from 'react'
import { Link } from 'react-router'
import Price from 'components/price'

export default React.createClass({
    render: function() {
        var p = this.props.item;
        return (
            <tr>
                <td>{p.id}</td>
                <td>
                    <Price value={p.total}/>
                </td>
                <td>
                    <Link to={'/invoices/' + p.id} className="btn btn-xs btn-default">Edit</Link>
                </td>
            </tr>
        )
    }
});