import React from 'react'
import Price from 'components/price'
import { Link } from 'react-router'

export default React.createClass({
    render: function() {
        var p = this.props.item;
        return (
            <tr>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.address}</td>
                <td>{p.phone}</td>
                <td>
                    <Link to={'/customers/' + p.id} className="btn btn-xs btn-default">Edit</Link>
                </td>
            </tr>
        )
    }
});