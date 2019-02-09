import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { APPID } from './appid.js';
import { Line } from 'react-chartjs-2';

const API = "https://api.openweathermap.org/data/2.5/forecast?units=metric&appid=" + APPID;

function ForecastDisplay(props) {

  const { list } = props.data;
  const { name: cityName, id: cityId } = props.data.city;
  let contents = [
    <h1 key={cityId}>{cityName}</h1>
  ];
  let forecasts = [];
  let temperatures = [];

  for (let i=0; i<=8;i++ ) { // 24hr forecast
    let { dt, main, weather } = list[i];
    let dateTime = new Date(dt * 1000);
    let { temp } = main;
    let { main: weatherMain, description, icon } = weather[0];
    let weatherIcon = "http://openweathermap.org/img/w/" + icon + ".png";

    temperatures.push(temp);

    forecasts.push({
      key: i,
      dateTime: dateTime,
      temperature: temp,
      weather: weatherMain,
      description: description,
      icon: weatherIcon,
    });
    contents.push(
      <div key={i}>
        <img src={weatherIcon} style={{float: "right"}}></img>
        <ul>
          <li>Datetime: {dateTime.toString()}</li>
          <li>Weather:
            <ul>
              <li>{weatherMain} -- {description}</li>
              <li>Current: {temp}</li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }

  const options = {
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Temperature"
        },
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Time"
        },
      }],
    },

  };

  contents.push(
    <Line
      key={"f2"}
      height={"80"}
      data={
        {
          labels: ["never", "gonna", "give", "you", "up","never", "gonna", "let", "you", "down"],
          datasets: [
            {
              label: "Temperature",
              lineTension: 0.25,
              fill: false,
              backgroundColor: 'rgba(151,187,205,1)',
              borderColor: 'rgba(151,187,205,1)',
              pointBackgroundColor: 'rgba(151,187,205,1)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(151,187,205,1)',
              data: temperatures,
            }
          ]
        }
      }
      options={options}
    />
  );
  return contents;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [
        { name: "Yokohama", id: "1848354", },
        { name: "Toronto", id: "6167865", },
      ],
      isLoaded: false,
      data: null,
      error: null,
    };
  }

  componentDidMount() {
    const cityId = this.state.cities[0].id
    const callUrl = API + "&id=" + cityId;
    fetch(callUrl)
      .then(response => response.json())
      .then(
        data => {
          this.setState({
            isLoaded: true,
            data: data,
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          })
        });
  }

  render() {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return (
        <div>
          <h3>oopsie</h3>
          {JSON.stringify(error)}
        </div>
      );
    }
    if (isLoaded) {
      return ([
        <ForecastDisplay
          key={"f1"}
          data={data}
        />,
      ]
      );
    } else {
      return (
        <div>Loading...</div>
      );
    }
  }
}

ReactDOM.render(
  <div className="container">
    <App />
  </div>,
  document.querySelector('#root')
);
