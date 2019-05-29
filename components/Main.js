import React, { Component } from 'react';

import './index.css';
import Card from './Card';


class Main extends Component {
    state = {
        one: 1,
        two: 2,
        three: 3
    }
    
    render() {
        // console.log(this.state);
        // console.log(this.props);
        return (
            <div className="App">
                <header className="App-header">
                    <img src="/static/logo.png" className="static-logo" alt="logo" />
                </header>
                <div className="Grid">
                    {
                        this.props.cards.map(card => (
                            <Card key={card.id} />
                        ))
                    }
                </div>

            </div>

        );
    }
}



export default Main;