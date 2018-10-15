import React, { Component } from 'react';
import RequestCardNorm from './RequestCardNorm/RequestCardNorm';
import RequestCardExp from './RequestCardExp/RequestCardExp';
import RequestCardFill from './RequestCardFill/RequestCardFill';

import Axios from 'axios';

class RequestCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayMode: 'norm',
        }
    }

    deleteMe = () => {
        console.log('inside of deleteMe');
        Axios({
            method: 'delete',
            url: '/api/recom/deleteRequest/' + this.props.data.request_id
        }).then((response) => {
            console.log('deletion worked!')
            // If the deletion is succesful, the component will become invisible
            this.modeToDest();
        }).catch((error) => {
            console.log('error in attemptRequest');
        })

    }

    modeExp = () => {
        console.log('returning to normal');
        this.setState({
            displayMode: 'exp',
        })
    }

    modeNorm = () => {
        this.setState({
            displayMode: 'norm',
        })
    }

    modeFill = () => {
        console.log('in mode fill');
        this.setState({
            displayMode: 'fillMe',
        })
    }

    modeToDest = () => {
        this.setState({
            displayMode: 'dest',
        })
    }


    displayRender = () => {
        switch (this.state.displayMode) {
            case 'norm':
                return (<div><RequestCardNorm data={this.props.data} />
                    <div onClick={this.modeExp} className="modeLink text-center m-0">
                        <i className="fas fa-ellipsis-h fas-custom m-0"></i>
                    </div>
                </div>)
            case 'exp':
                return (<div><RequestCardExp data={this.props.data} delete={this.deleteMe} fill={this.modeFill} norm={this.modeNorm} />
                    <div className="row ml-1 mr-1">
                        <div onClick={this.modeNorm} className="modeLink text-center col-4 bg-warning">
                            Cancel
                    </div>
                        <div onClick={this.modeExp} className="modeLink text-center col-4 m-0 bg-danger">
                            Delete
                    </div>
                        <div onClick={this.modeFill} className="modeLink text-center col-4 bg-primary">
                            Fill Request
                    </div>
                    </div>
                </div>)
            case 'fillMe':
                return (<div><RequestCardFill data={this.props.data} delete={this.deleteMe} exp={this.modeExp} norm={this.modeNorm} dest={this.modeToDest} />
                </div>


                )
            case 'dest':
                return (<div></div>)
            default:
                break;
        }
    }

    render() {

        return (
            <div>
                {this.displayRender()}
            </div>
        )

    }
}

export default RequestCard;
