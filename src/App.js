import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { ChuckNorrisApi } from './pages/ChuckNorrisApi/ChuckNorrisApi.js'
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import HangmanPage from "./pages/Games/HangmanPage/HangmanPage";
import HotspotPage from "./pages/Games/HotspotPage/HotspotPage";

function App() {
  return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/chuck" component={ChuckNorrisApi} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Registration} />
            <Route exact path="/hangman" component={HangmanPage} />
            <Route exact path="/admin/hotspot" component={HotspotPage} />
          </Switch>
        </Router>
      </div>
  );
}

export default App;
