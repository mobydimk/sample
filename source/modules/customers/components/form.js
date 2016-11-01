import React from 'react'

export default React.createClass({


    render: function() {
        return (
            <form onSubmit={this.props.submit}>
                <div className="form-group">
                    <label className="control-label">Name</label>
                    <input className="form-control" type="text" onChange={(e) => this.props.setData({ name: e.target.value})} value={this.props.data.name}/>
                </div>
                <div className="form-group">
                    <label className="control-label">Address</label>
                    <input className="form-control" type="text" onChange={(e) => this.props.setData({ address: e.target.value })} value={this.props.data.address}/>
                </div>
                <div className="form-group">
                    <label className="control-label">Phone</label>
                    <input className="form-control" type="text" onChange={(e) => this.props.setData({ phone: e.target.value })} value={this.props.data.phone}/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        )
    }
});