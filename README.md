# Weather forecast

A React app for displaying a weather forecast. 

**Live demo can be found [here](http://weather-forecast.louis-pham.surge.sh/)**.

The main purpose for this was to further gain familiarity with React and fetching data from 3rd-party APIs. This uses chart.js to display the data on a graph.

The application currently shows the weather forecast for Yokohama and Toronto. It displays a 48-hour weather forecast in 3-hour increments, along with a weather icon, description, and current temperature. A live clock is also shown, along with the last time the data was updated. The time along the x-axis is shown in the city's respective timezone.

An error message will display if the data cannot be retrieved initially. If the next API call fails then the current data will remain unchanged, but a small error in red text will appear in the bottom-right corner of the forecast.

You can obtain your own APP ID (from [OpenWeatherMap](https://openweathermap.org/)) to use for your own copy. The ForecastDisplay component imports the "APPID" variable from a separate file named "appid.js" which is just a simple variable declaration and export.
Example:

```javascript
export const APPID = "abcef123456foo7bar8";
```
## Known Issues
- timezone in x-axis label wont display on Internet Explorer
- basically unreadable on smaller displays

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
