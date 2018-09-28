import React, { Component } from 'react';

class RecomItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
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

    DisplayContents = (displayMode) => {
        displayMode = this.state.currentMode;
        
        switch (displayMode) {
            case 'bar':
                return (
                    <div>
                        {this.state.username}
                        {this.state.position}
                        {this.state.favorite}
                        {this.state.date_created}
                    </div>
                    )
            case 'expanded':
                return (
                    <div>
                        {this.state.username}
                        {this.state.position}
                        {this.state.employer}

                        {this.state.date_created}
                        {this.state.referral_body}
                        {this.state.can_contact}
                        {this.state.phone_number}
                        {this.state.email}
                    </div>
                )
            case 'video':
                return (
                    <div>
                        {this.state.aws_links}
                        <iframe key={this.props.data.id} width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
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
            <div>
                <button onClick={this.barHandler}>Bar Mode</button>
                <button onClick={this.expandedHandler}>Expanded Mode</button>
                <button onClick={this.videoHandler}>Video Mode</button>
                <button onClick={this.toggleFavorite}>Favorite</button>
                <this.DisplayContents />
            </div>
        );
    }
}

// this allows us to use <App /> in index.js
export default RecomItem;
