import React from "react";
import "./Dashboard.css"

export default class Dasboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tempValue: "",
            humidityValue: "",
        };
    }

    componentDidMount() {
        this.getData();
    }

    async getData() {
        const response = await fetch("http://localhost:5000/api/latest");
        const data = await response.json();
        this.setState({
            tempValue: data[0].tempValue,
            humidityValue: data[0].humidityValue,
        });
    }

    render() {
        return (
            <div className="textbox">
                <h1>Latest data</h1>
                <ul>
                    <li>Temperature: <span>{this.state.tempValue}</span>c</li>
                    <li>Humidity: <span>{this.state.humidityValue}</span>%rh</li>
                </ul>
            </div>
        );

    }
}