import React, { Component } from 'react';
import * as httpClient from '../httpClient';


class Weather extends Component {
    constructor(props) {
        super(props);

        this.state = {
            weatherLoaded: false,
            content: null
        };

        this.retrieveWeatherData = this.retrieveWeatherData.bind(this);
    }

    retrieveWeatherData() {
        const yahooURL = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(44418)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
        return fetch(
            yahooURL,
            { method: 'get' },
        )
        .then((response) => {
            return response.json();
        }).catch((error) => {
            console.log(`handleFetch failed: ${error}`);
            this.setState({ weatherLoaded: false });
        });
    }

    componentDidMount() {
        this.retrieveWeatherData()
            .then((dataReturn) => {
                this.setState({ weatherLoaded: true, content: dataReturn });
            });
    }

    showWeather() {
        var channel = this.state.content.query.results.channel;
        return (
            <div className="panel panel-info">
                <div className="panel-heading">
                    <span>
                        <strong>{channel.item.title}</strong>: {channel.item.condition.temp}F, {channel.item.condition.text}
                    </span>
                    <img
                        src={channel.image.url}
                        height={channel.image.height}
                        width={channel.image.width}
                        className="pull-right"
                    />
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
                {!this.state.content ? null : this.showWeather()}
            </div>
        );
    }
}


export default Weather;