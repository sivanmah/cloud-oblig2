import React from "react";
import "./Dashboard.css"


export default class AverageData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            averageTemp: "",
            averageHumidity: "",
            data: [],
            tempData: [],
            humidityData: [],
        };
    }

    async componentDidMount() {
        await this.getData();
         this.calculateAverage();
    }

    async getData() {
        const response = await fetch("http://localhost:5000/api/all");
        const data = await response.json();
        this.setState({data: data});
        this.setTempData();
        this.setHumidityData();
    }

    setTempData() {
        if (this.state.data !== []) {
            this.state.data.map(data => {
                this.state.tempData.push(data.tempValue);
            });
        }
    }

    setHumidityData() {
        if (this.state.data !== []) {
            this.state.data.map(data => {
                this.state.humidityData.push(data.humidityValue);
            });
        }
    }



    calculateAverage() {
        if (this.state.tempData !== []) {
            this.setState({averageTemp: this.state.tempData.reduce((a, b) => a + b) / this.state.tempData.length});
        }
        if (this.state.humidityData !== []) {
            this.setState({averageHumidity: this.state.humidityData.reduce((a, b) => a + b) / this.state.humidityData.length});
        }
    }
    
    render() {
        return (
            <div className="textbox">
                <h1>Average</h1>
                <ul>
                    <li>Temperature: <span>{this.state.averageTemp}</span>c</li>
                    <li>Humidity: <span>{this.state.averageHumidity}</span>%rh</li>
                </ul>
            </div>
        );
    }
}