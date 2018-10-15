import React, { Component } from 'react';

class RecomItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <div className="p-2">
                <div className="title">
                    {this.props.data.first_name} {this.props.data.last_name}
                </div>
                <div>
                    {this.props.data.email}
                </div>
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default RecomItem;
