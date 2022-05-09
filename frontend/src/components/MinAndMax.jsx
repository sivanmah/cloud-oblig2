import React from "react";

export default class MinAndMax extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            minTemp: "",
            maxTemp: "",
            minHumidity: "",
            maxHumidity: "",
        };
    }

    async componentDidMount() {
        await this.getData();
    }

    async getData() {
        const response = await fetch("https://assignment2-idg2001-group2.herokuapp.com/api/minandmax");
        const data = await response.json();
        this.setState({
            minTemp: data.minTemp[0].tempValue,
            maxTemp: data.maxTemp[0].tempValue,
            minHumidity: data.minHumidity[0].humidityValue,
            maxHumidity: data.maxHumidity[0].humidityValue
        });
    }

    render() {
        return (
            <div className="textbox">
                <h1>Min and Max</h1>
                <ul>
                    <li>Temperature: <span>{this.state.minTemp}</span>c - <span>{this.state.maxTemp}</span>c</li>
                    <li>Humidity: <span>{this.state.minHumidity}</span>%rh - <span>{this.state.maxHumidity}</span>%rh</li>
                </ul>
            </div>
        );
    }
}