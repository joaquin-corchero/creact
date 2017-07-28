import React, { Component } from 'react';
import Client from '../Client';

class Weather extends Component {
    constructor(props) {
        super(props);

        this.state = {
            weatherLoaded: false,
            weather: null
        };
    }

    componentDidMount() {
        const yahooURL = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(44418)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
        return Client.get(yahooURL)
            .then((dataReturn) => {
                this.setState({ weatherLoaded: true, weather: dataReturn });
            });
    }

    showWeather() {
        var channel = this.state.weather.query.results.channel;
        return (
            <div className="panel panel-info weather-forecast">
                <div className="panel-heading">
                    <img
                        src={channel.image.url}
                        height={channel.image.height}
                        width={channel.image.width}
                    /> <span><strong>{channel.item.title}</strong>: {channel.item.condition.temp}F, {channel.item.condition.text}</span>
                </div>
                <div className="panel-body container">
                    <div className="row">
                        {channel.item.forecast.map((item, i) =>
                            <div className="col-sm-3" key={i}>
                                <strong>{item.day}, {item.date}</strong><br />
                                {item.text}, {item.high}F - {item.low}F
                            </div>)
                        }
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div>
                {!this.state.weather ? null : this.showWeather()}
            </div>
        );
    }
}


export default Weather;