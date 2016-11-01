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
                <td>
                    <Price value={p.price}/>
                </td>
                <td>
                    <Link to={'/products/' + p.id} className="btn btn-xs btn-default">Edit</Link>
                </td>
            </tr>
        )
    }
});