import React from "react";
import "./Dashboard.css"

export default class Dasboard extends React.Component {
    render() {
        return (
            <div className="textbox">
                <ul>
                    <li>Temperature: <span>15</span>c</li>
                    <li>Humidity: <span>21</span>%rh</li>
                </ul>
            </div>
        );

    }
}