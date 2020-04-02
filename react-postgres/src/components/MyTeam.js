import React from 'react';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import wrongIcon from "../img/wrongIcon.jpg";
import rightIcon from "../img/rightIcon.jpg"

class myTeam extends React.Component {

  // riders' players fetched from database
  state = { players: [] }

  componentDidMount() {
    let sessionStore = JSON.parse(sessionStorage.getItem("logInfo"));
    // prevent sessionStorage null problem
    if (sessionStorage.length !== 0) {
      if (sessionStore[0]) { // is logged in (not sure if necessary)
        this.getPlayersRiders(sessionStore[3])
      }
    }
  }

  getPlayersRiders(playerID) {
    const pid = parseInt(playerID)
    fetch(`http://localhost:3001/playersriders/${pid}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const arrayOfObjects = eval(data);
        const stateData = this.parseJSONdata(arrayOfObjects)
        this.setState({players: (stateData)});
      });
  }

  parseJSONdata(arrayOfObjects) {
    const playersriders = []
    arrayOfObjects.forEach(element => {
      const originality = (element.originalrider) ? 1 : 0      
      const stateArr = [element.name, element.team, element.roundjoined, originality, element.price]      
      playersriders.push(stateArr)
    });
      /*
      ",{"name":"Pekka Laitinen",
      "team":"Kaupin Kanuunat"
      ridernumber":5,
      "roundjoined":3,
      "originalrider":false", 
      "price": 1000]"]
      */
    return playersriders
  }
  
  render() {    
    // modify data to please the eye
    const players = this.state.players
    console.log(players) // object
    let rows = []
    for (let i=0; i<players.length; i++) {
      const originalRider = (players[i][3] === 1) ? <Image src={rightIcon} width="25" roundedCircle /> : <Image src={wrongIcon} width="25" roundedCircle />
      const row = <tr key={i}><td>{players[i][0]}</td>
                      <td>{players[i][1]}</td>
                      <td>{players[i][2]}</td>
                      <td>{originalRider}</td>
                      <td>{players[i][4]}</td>
                    </tr>
      rows.push(row)
    }
    return <Container>
      <div className="list row">
          <h1>Cycling Manager - My Team</h1>
          <table className="table table-striped">
            <thead>
              <tr>
                <td>
                  playerid
                </td>
                <td>
                  ridernumber
                </td>
                <td>
                  roundjoined
                </td>
                <td>
                  original rider
                </td>
                <td>
                  price
                </td>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </table>
       </div>
       </Container>
  }
}
 
export default myTeam;