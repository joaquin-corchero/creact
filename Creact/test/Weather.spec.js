import React from 'react';
import Weather from '../client/components/Weather';
import sinon from 'sinon';
import Client from '../client/Client';

describe('When working with the weather component',  () => {
    let wrapper;
    let ClientMock;
    let get;
    const data = {
    "query": {
        "results": {
            "channel": {
                "image": {
                    "title": "Yahoo! Weather",
                    "width": "142",
                    "height": "18",
                    "link": "http://weather.yahoo.com",
                    "url": "http://l.yimg.com/a/i/brand/purplelogo//uh/us/news-wea.gif"
                },
                "item": {
                    "title": "Conditions for London, England, GB at 02:00 PM BST",
                    "lat": "51.506401",
                    "long": "-0.12721",
                    "link": "http://us.rd.yahoo.com/dailynews/rss/weather/Country__Country/*https://weather.yahoo.com/country/state/city-44418/",
                    "pubDate": "Fri, 28 Jul 2017 02:00 PM BST",
                    "condition": {
                        "code": "23",
                        "date": "Fri, 28 Jul 2017 02:00 PM BST",
                        "temp": "69",
                        "text": "Breezy"
                    },
                    "forecast": [
                        {
                            "code": "39",
                            "date": "28 Jul 2017",
                            "day": "Fri",
                            "high": "70",
                            "low": "58",
                            "text": "Scattered Showers"
                        },
                        {
                            "code": "11",
                            "date": "29 Jul 2017",
                            "day": "Sat",
                            "high": "70",
                            "low": "61",
                            "text": "Showers"
                        },
                        {
                            "code": "39",
                            "date": "30 Jul 2017",
                            "day": "Sun",
                            "high": "67",
                            "low": "60",
                            "text": "Scattered Showers"
                        },
                        {
                            "code": "30",
                            "date": "31 Jul 2017",
                            "day": "Mon",
                            "high": "67",
                            "low": "57",
                            "text": "Partly Cloudy"
                        },
                        {
                            "code": "30",
                            "date": "01 Aug 2017",
                            "day": "Tue",
                            "high": "71",
                            "low": "56",
                            "text": "Partly Cloudy"
                        },
                        {
                            "code": "30",
                            "date": "02 Aug 2017",
                            "day": "Wed",
                            "high": "72",
                            "low": "57",
                            "text": "Partly Cloudy"
                        },
                        {
                            "code": "28",
                            "date": "03 Aug 2017",
                            "day": "Thu",
                            "high": "73",
                            "low": "63",
                            "text": "Mostly Cloudy"
                        },
                        {
                            "code": "30",
                            "date": "04 Aug 2017",
                            "day": "Fri",
                            "high": "70",
                            "low": "60",
                            "text": "Partly Cloudy"
                        },
                        {
                            "code": "30",
                            "date": "05 Aug 2017",
                            "day": "Sat",
                            "high": "69",
                            "low": "58",
                            "text": "Partly Cloudy"
                        },
                        {
                            "code": "30",
                            "date": "06 Aug 2017",
                            "day": "Sun",
                            "high": "71",
                            "low": "58",
                            "text": "Partly Cloudy"
                        }
                    ],
                }
            }
        }
    }
};

    beforeEach(() => {
        ClientMock = sinon.mock(Client);
        get = ClientMock.expects("get");
        wrapper = mount(<Weather />);
        get.returns(Promise.resolve(data));
    });

    afterEach(() => {
        ClientMock.restore();
    });

    it('it calls the get client to get the data', () => {
        expect(get.once().callCount).to.equal(1);
        ClientMock.verify();
    });

    describe('when it shows the weather', () =>
    {
        it('displays the yahoo image', () => {
            var instance = wrapper.instance();
            alert(instance.showWeather);
            instance.showWeather(data);
            expect(wrapper.find('yahooImage')).to.be.present();
        });
    });

});