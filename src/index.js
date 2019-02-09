import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


function ForecastDisplay(props) {
  const cityName = props.cityName;
  const { cnt, list } = props.data;
  const { dt, main, weather, clouds, wind, rain } = list[0];
  const dateTime = new Date(dt * 1000);
  const { temp, temp_min, temp_max } = main;
  const { id, main: weatherMain, description, icon } = weather[0];
  const weatherIcon = "http://openweathermap.org/img/w/" + icon + ".png";

  return (
    <div>
      <img src={weatherIcon} style={{float: "right"}}></img>
      <ul>
        <li>{cityName}</li>
        <li>{cnt}</li>
        <li>Datetime: {dateTime.toString()}</li>
        <li>Weather:
          <ul>
            <li>[{id}] {weatherMain} -- {description}</li>
            <li>Current: {temp}</li>
            <li>Min: {temp_min}</li>
            <li>Max: {temp_max}</li>
          </ul>
        </li>
      </ul>
      <p>{JSON.stringify(list[0])}</p>
    </div>
  );
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
    const callUrl = API + "&id=" + this.state.cities[0].id;
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
        <div>{JSON.stringify(error)}</div>
      );
    }
    if (isLoaded) {
      return (
        <ForecastDisplay
          data={data}
          cityName={"Yokohama"}
        />
      );
    } else {
      return (
        <div>Whatup bi</div>
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
