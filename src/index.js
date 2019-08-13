import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ForecastDisplay from './forecastdisplay.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [
        { name: "Yokohama", country: "Japan", id: "1848354", timeZone: "Asia/Tokyo", },
        { name: "Toronto", country: "Canada", id: "6167865", timeZone: "America/Toronto", },
      ],
      currentTime: "",
    };
  }

  setTime() {
    this.setState({
      currentTime: new Date().toLocaleString("en-US"),
    });
  }

  componentDidMount() {
    setInterval(() => {
      this.setTime()
    }, 1000);
  }

  render() {
    return ([
      <div key="header">
        <h1>Weather Forecast</h1>
        <h2 className="clock">{this.state.currentTime}</h2>
      </div>,
      <ForecastDisplay
        key={this.state.cities[0].id}
        cityId={this.state.cities[0].id}
        cityName={this.state.cities[0].name}
        country={this.state.cities[0].country}
        timeZone={this.state.cities[0].timeZone}
      />,
      <ForecastDisplay
        key={this.state.cities[1].id}
        cityId={this.state.cities[1].id}
        cityName={this.state.cities[1].name}
        country={this.state.cities[1].country}
        timeZone={this.state.cities[1].timeZone}
      />
    ]
    );
  }
}

ReactDOM.render(
  <div className="container">
    <App />
  </div>,
  document.querySelector('#root')
);
