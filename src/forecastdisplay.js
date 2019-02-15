import React from 'react';
import { Line } from 'react-chartjs-2';
import { APPID } from './appid.js';

const API = "https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=" + APPID;

class ForecastDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.timeZone = props.timeZone;
    this.cityName = props.cityName;
    this.cityId = props.cityId;
    this.country = props.country;
    this.state = {
      isLoaded: false,
      data: null,
      error: null,
      lastUpdated: null,
    };
  }

  fetchData() {
    const callUrl = API + "&id=" + this.cityId;
    fetch(callUrl)
      .then(response => response.json())
      .then(
        data => {
          this.setState({
            isLoaded: true,
            data: data.list,
            lastUpdated: new Date().getTime(),
            error: null,
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          })
        })
        .then(() => setTimeout(this.fetchData.bind(this), 30000));

  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    let toRender = [<h1 key={this.cityName} className="city-name">{this.cityName} <small>{this.country}</small></h1>];
    if (this.state.isLoaded) {
      if (this.state.error && !this.state.data) {
        toRender.push(
          <div key="bigError">
            <h3>error</h3>
            <p>{this.state.error.message}</p>
          </div>
        );
      } else {
        let temperatures = [];
        let labels = [];
        let timeZoneName;
        for (let i=0; i<=12;i++ ) { // 36hr forecast
          const { dt, main, weather } = this.state.data[i];
          const { temp } = main;
          const { icon, description: weatherDescription } = weather[0];
          // console.log(weather);
          if (i === 0) {
            // get short version of timezone
            timeZoneName = Intl.DateTimeFormat('en-US',
              {
                timeZone: this.timeZone,
                timeZoneName: "short"
              }).format().split(",")[1];

            toRender.push(
              <div key="currentWeather" className="current-weather">
                <span className="now">Now</span>
                <span className="temperature">{temp}&deg;C</span>
                <span className="weather-description">{weatherDescription}</span>
              </div>,
              <img key="weatherIcon" className="weather-icon" src={"http://openweathermap.org/img/w/" + icon + ".png"} alt="current weather icon"/>
            );
          }

          let dateTime = new Date(dt * 1000).toLocaleString("en-US", {timeZone: this.timeZone});
          dateTime = new Date(dateTime);
          let hours = dateTime.getHours();
          const amOrPm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12;
          hours = hours ? hours : 12;

          labels.push(dateTime.getMonth() + 1 + "/" + dateTime.getDate() + " " + hours + ":00" + amOrPm);
          temperatures.push(temp);
        }

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

        let sortaYellow = 'rgba(255,226,0,1)';
        let white = 'rgba(255,255,255,1)';

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
      }
    } else {
      toRender.push(<div key={"loading"}>Loading...</div>);
    }

    return (
      <div key={this.cityId + "forecast"} className="forecast-display">{toRender}</div>
    );
  }
}

export default ForecastDisplay;
