import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ChuckNorrisApi } from './pages/ChuckNorrisApi/ChuckNorrisApi.js'

function App() {
  return (
      <div className="App">
        <Router>
          <Switch>
            {/*<Route exact path="/" component={LandingPage} />*/}
            <Route exact path="/chuck" component={ChuckNorrisApi} />
          </Switch>
        </Router>
      </div>
  );
}

export default App;
