import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import {ChuckNorrisApi} from './pages/ChuckNorrisApi/ChuckNorrisApi.js'
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import HangmanPage from "./pages/Games/HangmanPage/HangmanPage";
import HotspotPage from "./pages/Games/HotspotPage/HotspotPage";
import {ExercisePage} from "./pages/ExercisePage/ExercisePage";
import PetChooser from './pages/PetChooser/PetChooser';
import {PetFeeder} from "./pages/PetFeeder/PetFeeder.js";
import Header from "./components/Header/Header";
import {createMuiTheme, ThemeProvider} from "@material-ui/core";
import {grey} from "@material-ui/core/colors";
import HotspotKidPage from "./pages/Games/HotspotPage/HotspotKidPage";

export const theme = createMuiTheme({
    palette: {
        primary: {
            dark: '#538723',
            main: '#5C9129',
            light: '#8BBF58',
            lightest: '#B2C7A3'
        },
        secondary: {
            main: '#993166'
        },
        text: {
            secondary: grey[50]
        }
    },
    typography: {
        fontFamily: 'Lato',
        fontWeightRegular: 400,
        fontWeightBold: 700
    }
})

function App() {
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <Router>
                    <Header/>
                    <Switch>
                        <Route exact path="/chuck" component={ChuckNorrisApi}/>
                        <Route exact path="/login" component={Login}/>
                        <Route exact path="/register" component={Registration}/>
                        <Route exact path="/hangman" component={HangmanPage}/>
                        <Route exact path="/hotspot" component={HotspotKidPage}/>
                        <Route exact path="/admin/hotspot" component={HotspotPage}/>
                        <Route exact path="/exercise" component={ExercisePage}/>
                        <Route exact path="/petchooser" component={PetChooser}/>
                        <Route exact path="/petfeeder" component={PetFeeder}/>
                    </Switch>
                </Router>
            </ThemeProvider>
        </div>
    );
}

export default App;
