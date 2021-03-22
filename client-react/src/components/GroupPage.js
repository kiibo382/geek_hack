import React, { Component } from "react";
import ReactDOM from 'react-dom';
import { Chat } from './chat/Chat';

export default class GroupPage extends Component {
    constructor(props) {
        super(props);
        this.subRoot1 = document.getElementById("sub")
        this.state = { /* ... */ };
    }
    componentDidMount() {
        ReactDOM.render(
            <React.StrictMode>
                <Chat />
            </React.StrictMode>,
            this.subRoot1
        );
    }
    componentDidUpdate() {
        ReactDOM.render(
            <React.StrictMode>
                <Chat />
            </React.StrictMode>,
            this.subRoot1
        );
    }

    componentWillUnmount() {
        ReactDOM.render(
            <React.StrictMode>
                <Chat />
            </React.StrictMode>,
            this.subRoot1
        );
    }

    render() {
        return (
            <div className="row">
                <h2>This is Group Page</h2>
                <div id="sub" onChange={this.componentDidMount}></div>
            </div>
        );
    }
}