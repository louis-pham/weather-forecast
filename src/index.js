import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const API="http://api.openweathermap.org/data/2.5/forecast?&APPID=86cd9d99627d84adb18f059ebe3d35f7";

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
        <div>{JSON.stringify(data)}</div>
      );
    } else {
      return (
        <div>Whatup bi</div>
      );
    }
  }
}

ReactDOM.render(
  <div class="container">
    <App />
  </div>,
  document.querySelector('#root')
);
