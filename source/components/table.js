import React from 'react'

export default React.createClass({

    render: function() {
        if(this.props.rows_count == 0) {
            return <div className="alert alert-info">Empty list</div>
        }
        return (
            <table className="table">
                <tbody>
                    <tr>
                        {this.props.columns.map((caption,i)=>
                            <th key={i}>{caption}</th>
                        )}
                    </tr>
                    {this.props.children}
                </tbody>
            </table>
        )
    }
})