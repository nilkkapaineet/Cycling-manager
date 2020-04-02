/*
import React, {useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MyTeam from "./components/MyTeam"
import Login from "./components/Login"
import Register from "./components/Register"

function App() {
  const [Players, setPlayers] = useState(false);
  useEffect(() => {
    getPlayer();
  }, []);
  function getPlayer() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setPlayers(data);
      });
  }
  function createPlayer() {
    let name = prompt('Enter Player name');
    let password = prompt('Enter Player password');
    let teamName = prompt('Enter Player Team name')
    fetch('http://localhost:3001/Players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, password, teamName}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        console.log(data);
        getPlayer();
      });
  }
  function deletePlayer() {
    let id = prompt('Enter Player id');
    console.log("delete: " + id);
    fetch(`http://localhost:3001/Players/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getPlayer();
      });
  }
  return (
    <div>
      {Players ? Players : 'There is no Player data available'}
      <br />
      <button onClick={createPlayer}>Add Player</button>
      <br />
      <button onClick={deletePlayer}>Delete Player</button>
    <Router>
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/" className="navbar-brand">
          Manageri
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/Register"} className="nav-link">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/Login"} className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/MyTeam"} className="nav-link">
              MyTeam
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>0
          <Route exact path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route exact path="/MyTeam" component={MyTeam} />
        </Switch>
      </div>
    </div>
  </Router>
  </div>
  );
}
export default App;
*/
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import MyTeam from './components/MyTeam';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
// import Error from './components/Error';
// import Navigation from './components/Navigation';
// import { Redirect } from 'react-router-dom';


class App extends Component {
  // <Route component={Error}/>
  render() {
    let sessionStore = JSON.parse(sessionStorage.getItem("logInfo"));
    console.log(sessionStore)
    let loggedIn = false
    let user = ''
    if (sessionStore !== null) {
      loggedIn = sessionStore[0]
      user = sessionStore[1]
    } else {
      loggedIn = false
    }
    loggedIn = loggedIn === "true" ? true : false
    
    const padding = {padding: 5}
    return (
      <BrowserRouter>
        <div>
          <Link style={padding} to="/">My Team</Link>
          {loggedIn
            ? <Link style={padding} to="/logout">Logout</Link>
            : <Link style={padding} to="/register">Register</Link>
          }
          {loggedIn
            ? <em>{user} logged in</em>
            : <Link style={padding} to="/login">Login</Link>
          }
        </div>

        <Switch>
        <Route path="/" component={MyTeam} exact />
        <Route path="/login">
            {loggedIn 
              ? <em>{user} logged in</em> 
              : <Route path="/login" component={Login} />}
          </Route>
          <Route path="/register" component={Register} />
          <Route path="/logout" component={Logout} />}
        </Switch>
      </BrowserRouter> 
    );
  }
}

export default App;