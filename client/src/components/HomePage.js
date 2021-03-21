import React, { Component } from "react";
import Icon from "./home.jpg"

export default class HomePage extends Component {
    render() {
        return (
            <div className="row">
                <img src={Icon} class="img-fluid" />
            </div>
        );
    }
}
