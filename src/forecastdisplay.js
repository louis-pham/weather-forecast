import React from 'react';
import { Line } from 'react-chartjs-2';
import { APPID } from './appid.js';

const WEATHERFORECASTAPI = "https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=" + APPID;

const CURRENTWEATHERAPI = "https://api.openweathermap.org/data/2.5/weather?units=metric&appid=" + APPID;

const FETCHINTERVAL = 30000;

class ForecastDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.timeZone = props.timeZone;
    this.cityName = props.cityName;
    this.cityId = props.cityId;
    this.country = props.country;
    this.state = {
      forecastData: null,
      currentData: null,
      error: null,
      currentError: null,
      lastUpdated: null,
    };
  }

  fetchForecastData() {
    const forecastCallUrl = WEATHERFORECASTAPI + "&id=" + this.cityId;
    fetch(forecastCallUrl)
      .then(response => response.json())
      .then(
        data => {
          this.setState({
            forecastData: data.list,
            lastUpdated: new Date().getTime(),
            error: null,
          });
        },
        error => {
          this.setState({
            error
          })
        })
        .then(() => setTimeout(this.fetchForecastData.bind(this), FETCHINTERVAL));

  }

  fetchCurrentData() {
    const currentCallUrl = CURRENTWEATHERAPI + "&id=" + this.cityId;
    fetch(currentCallUrl)
      .then(response => response.json())
      .then(
        data => {
          this.setState({
            currentData: data,
          });
          console.log(this.state.currentData);
        },
        error => {
          this.setState({
            currentError: error,
          });
          console.log("big oopsie");
        })
        .then(() => setTimeout(this.fetchCurrentData.bind(this), FETCHINTERVAL));
  }

  componentDidMount() {
    this.fetchForecastData();
    this.fetchCurrentData();
  }

  render() {
    let toRender = [<h1 key={this.cityName} className="city-name">{this.cityName} <small>{this.country}</small></h1>];

    if (this.state.error && !this.state.forecastData) {
      toRender.push(
        <div key="bigError">
          <h3>error</h3>
          <p>{this.state.error.message}</p>
        </div>
      );
    }

    if (this.state.forecastData) {
      let temperatures = [];
      let labels = [];
      let timeZoneName;

      // get short version of timezone
      timeZoneName = Intl.DateTimeFormat('en-US',
        {
          timeZone: this.timeZone,
          timeZoneName: "short"
        }).format().split(",")[1];

      // format the current weather data
      if (this.state.currentData) {
        toRender.push(
          <div key="currentWeather" className="current-weather">
            <span className="now">Now</span>
            <span className="temperature">{this.state.currentData.main.temp}&deg;C</span>
            <span className="weather-description">{this.state.currentData.weather[0].description}</span>
          </div>,
          <img key="weatherIcon" className="weather-icon" src={"http://openweathermap.org/img/w/" + this.state.currentData.weather[0].icon + ".png"} alt="current weather icon"/>
        );
      }

      for (let i=0; i<=16;i++ ) { // 48hr forecast
        const { dt, main } = this.state.forecastData[i];
        const { temp } = main;

        // format time to city's timezone
        let dateTime = new Date(dt * 1000).toLocaleString("en-US", {timeZone: this.timeZone});
        dateTime = new Date(dateTime);
        let hours = dateTime.getHours();
        const amOrPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;

        labels.push(dateTime.getMonth() + 1 + "/" + dateTime.getDate() + " " + hours + amOrPm);
        temperatures.push(temp);
      }

      // settings for line graph display
      const options = {
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Temperature (C)",
              fontColor: "#fff",
            },
            ticks: {
              fontColor: "#fff",
            },
            gridLines: {
              color: "#2b2b2b",
              zeroLineColor: "#fff",
            },
          }],
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: "Time (timezone: " + timeZoneName + ")",
              fontColor: "#fff",
            },
            ticks: {
              fontColor: "#fff",
            },
          }],
        },
      };

      const sortaYellow = 'rgba(255,226,0,1)';
      const white = 'rgba(255,255,255,1)';

      toRender.push(
        <Line
          key={"f2"}
          height={60}
          data={
            {
              labels: labels,
              datasets: [
                {
                  label: "Temperature (C)",
                  lineTension: 0.25,
                  pointRadius: 5,
                  pointHoverRadius: 7,
                  fill: false,
                  backgroundColor: sortaYellow,
                  borderColor: sortaYellow,
                  pointBackgroundColor: white,
                  pointStrokeColor: '#fff',
                  pointHighlightFill: '#fff',
                  pointHighlightStroke: sortaYellow,
                  data: temperatures,
                }
              ]
            }
          }
          options={options}
        />,
        <span key="lastUpdated" className="last-updated">last updated: {new Date(this.state.lastUpdated).toLocaleString("en-US")}</span>,
        <span key="smallError" className="error-message">{this.state.error ? "Error: " + this.state.error.message : ""}</span>,
      );

    } else {
      toRender.push(<div key={"loading"}>Loading...</div>);
    }

    return (
      <div key={this.cityId + "forecast"} className="forecast-display">{toRender}</div>
    );
  }
}

export default ForecastDisplay;
