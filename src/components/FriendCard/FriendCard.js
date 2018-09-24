import React, { Component } from 'react';

class RecomItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <div>
                {this.props.data.first_name} {this.props.data.last_name} <br />
                {this.props.data.email}
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default RecomItem;
