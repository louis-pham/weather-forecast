import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ForecastDisplay from './forecastdisplay.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [
        { name: "Yokohama", id: "1848354", timeZone: "Asia/Tokyo", },
        { name: "Toronto", id: "6167865", timeZone: "America/Toronto", },
      ],
    };
  }

  render() {
    return ([
      <div>
        <h1>Weather Forecast</h1>
      </div>,
      <ForecastDisplay
        key={this.state.cities[0].id}
        cityId={this.state.cities[0].id}
        cityName={this.state.cities[0].name}
        timeZone={this.state.cities[0].timeZone}
      />,
      <ForecastDisplay
        key={this.state.cities[1].id}
        cityId={this.state.cities[1].id}
        cityName={this.state.cities[1].name}
        timeZone={this.state.cities[1].timeZone}
      />,
      <footer><a target="_blank" href="https://github.com/louis-pham">Louis Pham</a></footer>
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
