import React, { Component } from 'react';


import moment from 'moment'
import './RecomItem.css'
import { formatNumber } from 'libphonenumber-js';




class RecomItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: this.props.data.first_name,
            last_name: this.props.data.last_name,
            username: this.props.data.username,
            email: this.props.data.email,
            phone_number: this.props.data.phone_number,
            date_created: this.props.data.date_created,
            referral_body: this.props.data.referral_body,
            aws_links: this.props.data.aws_links,
            can_contact: this.props.data.can_contact,
            favorite: this.props.data.favorite,
            employer: this.props.data.employer,
            position: this.props.data.position,

            currentMode: 'bar',
        }
    }

    changeMode = (mode) => {
        switch (mode) {
            case 'bar':
                this.setState({
                    currentMode: 'bar',
                })
                console.log('Bar Mode');
                break;
            case 'expanded':
                this.setState({
                    currentMode: 'expanded',
                })
                console.log('Expanded Mode');
                break;
            case 'video':
                this.setState({
                    currentMode: 'video',
                })
                console.log('Video Mode');
                break;
            default:
                console.log('ChangeMode not working');

        }
    }

    favToggle = () => {
        if(this.state.favorite === true) {
            return (
                <i className="fab fa-gratipay iLike mt-1 mb-3"></i>
            )
        } else {
            return (
                <i className="fab fa-gratipay text-muted mt-1 mb-3"></i>
            )
        }
    }

    barHandler = () => {
        this.changeMode('bar');
        return ('Bar Tacos!');
    }
    expandedHandler = () => {
        this.changeMode('expanded');
        return ('Expanded Tacos!!');
    }
    videoHandler = () => {
        this.changeMode('video');
        return ('Video Tacos!!!')
    }
    playVideo = () => {
        if (this.state.aws_links === '' || undefined || null) {
            return;
        } else {
            return (
                <div className="text-center">
                    <i onClick={this.videoHandler} className="fab fa-youtube"></i>
                </div>
            );
        }
    }

    contactDisplay = () => {

        let phoneNumberDisplay = formatNumber({ country: 'US', phone: this.state.phone_number }, 'National')
        switch (this.state.can_contact) {
            case true:
                return (
                    <div className="canContact mb-3 mr-4 pt-2 pb-2 row shadow">
                        <div className="col-1">
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <div className="col contactNotice">
                            <div>
                                I am willing to be contacted about this recommendation.
                                <hr />
                            </div>
                            <div className="ml-2 contactInfo">
                                <div>
                                    <i className="fas fa-phone-square"></i>{" " + phoneNumberDisplay}
                                </div>
                                <div>
                                    <i className="fas fa-envelope-square"></i> {" " + this.state.email}
                                </div>

                            </div>
                        </div>

                    </div>
                );
            case false:
                return (
                    <div className="cannotContact mb-3 mr-4 pt-2 pb-2 row shadow">
                        <div className="col-1">
                            <i className="fas fa-exclamation-circle"></i>
                        </div>
                        <div className="col contactNotice">
                            I do not wish to be contacted about this recommendation.
                        </div>
                    </div>
                );

            default:
                break;
        }
    }

    DisplayContents = (displayMode) => {
        displayMode = this.state.currentMode;
        let dateToDisplay = moment(this.state.date_created).format('MMMM Do YYYY')

        switch (displayMode) {
            case 'bar':
                return (
                    <div className="container mb-2 mt-1">
                        <div className="dateDisplay text-muted row">
                            {dateToDisplay}
                        </div>
                        <div className="row pl-2">
                            <div className="col-1 pl-1">
                                <i className="fas fa-user-circle text-primary"></i>
                                {this.favToggle()}
                                
                            </div>
                            <div className="col">
                                <h5 className="card-title title">{this.state.first_name} {this.state.last_name}</h5>

                                <p className="text-muted">
                                    <span className="">
                                        {this.state.employer}
                                    </span>
                                </p>
                            </div>

                        </div>
                        <div onClick={this.expandedHandler} className="modeLink text-center">
                            <i className="fas fa-ellipsis-h fas-custom"></i>
                        </div>
                    </div>
                )
            case 'expanded':
                return (
                    <div className="container mb-2 mt-3">
                        <div className="dateDisplay text-muted row">
                            {dateToDisplay}
                        </div>
                        <div className="row pl-2">
                            <div className="col-1 pl-1">
                                <i className="fas fa-user-circle text-primary"></i>
                                {this.favToggle()}
                            </div>

                            <div className="col">
                                <h5 className="card-title title">{this.state.first_name} {this.state.last_name}</h5>
                                <p className="text-muted">
                                    <span>
                                        {this.state.employer}
                                    </span>
                                    <br />
                                    <span className="mb-2">
                                        {this.state.position}
                                    </span>
                                    <br />
                                    <span className="referralBody">
                                        "{this.state.referral_body}"
                                    </span>
                                </p>
                                <div className="mb-3">
                                    {this.playVideo()}
                                </div>
                                <div>
                                    {this.contactDisplay()}
                                </div>
                            </div>
                        </div>
                        <div onClick={this.barHandler} className="modeLink text-center">
                            <i className="fas fa-angle-up fas-custom"></i>
                        </div>
                    </div>
                )
            case 'video':
                return (
                    <div className="container mb-2 mt-3 column">
                        <div className="dateDisplay text-muted row">
                            {dateToDisplay}
                        </div>
                        <div className="row pl-2">
                            <div className="col-1 pl-1">
                                <i className="fas fa-user-circle text-primary"></i>
                            </div>

                            <div className="col">
                                <h5 className="card-title title">{this.state.first_name} {this.state.last_name}</h5>
                                <p className="text-muted">
                                    <span className="">
                                        {this.state.employer}
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="mx-auto">
                            <video  className="embed-responsive-item" src={this.state.aws_links} id="player" controls data-plyr-config='{ "title": "This is an example video", "volume": 1, "debug": true }'></video>
                        </div>

                        <div onClick={this.expandedHandler} className="modeLink text-left pl-2">
                            <i className="fas fa-long-arrow-alt-left fas-custom"></i>
                        </div>

                    </div>
                )
            default:
                console.log('DisplayContents not working');
        }
    }

    toggleFavorite = () => {
        console.log('FavoritesChange!');
    }



    render() {
        return (
            <div className="recomItem mb-3 mt-3 shadow">
                <this.DisplayContents />
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default RecomItem;
