import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';
import wrongIcon from "../img/wrongIcon.jpg";
import rightIcon from "../img/rightIcon.jpg"

class myTeam extends React.Component {

  // riders' players fetched from database
  state = {
    players: [], removeSomeone: false,
    removables: [], totalPrice: 0, buyList: [],
    riders: [], newTotalPrice: 0, buySomeone: false
  }

  componentDidMount() {
    let sessionStore = JSON.parse(sessionStorage.getItem("logInfo"));
    // prevent sessionStorage null problem
    if (sessionStorage.length !== 0) {
      if (sessionStore[0]) { // is logged in (not sure if necessary)
        this.getPlayersRiders(sessionStore[3])
      }
    }
    // get all riders for add riders into the team
    this.getRiders()
  }

  getRiders() {
    fetch('http://localhost:3001/riders')
      .then(response => {
        return response.json();
      })
      .then(data => {
        const arrayOfObjects = eval(data);
        this.parseRiderData(arrayOfObjects)
      });
  }

  parseRiderData(arrayOfObjects) {
    const riders = []
    arrayOfObjects.forEach(element => {
      const stateArr = [element.number, element.name, element.team, element.price]
      riders.push(stateArr)
    });
    console.log("riders: " + riders)
    this.setState({ riders: riders })
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
        this.setState({ players: (stateData) });
      });
  }

  parseJSONdata(arrayOfObjects) {
    const playersriders = []
    let tmpPrice = 0
    arrayOfObjects.forEach(element => {
      tmpPrice += element.price
      const originality = (element.originalrider) ? 1 : 0
      const stateArr = [element.name, element.team, element.roundjoined, originality, element.price]
      playersriders.push(stateArr)
    });
    this.setState({ totalPrice: tmpPrice, newTotalPrice: tmpPrice })
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

  checked = (event) => {
    if (event.target.checked) {
      this.setState({ removeSomeone: true })
      this.state.removables.push(event.target.name)
    } else {
      const index = this.state.removables.indexOf(event.target.name);
      if (index > -1) {
        this.state.removables.splice(index, 1);
      }
    }
    if (this.state.removables.length === 0) {
      this.setState({ removeSomeone: false })
    }
  }

  getBuyableRiderInfo = (number, plus) => {
    // search price from 
    this.state.riders.forEach(element => {
      if (parseInt(element[0]) == number) {
        const newPrice = (plus) ? this.state.newTotalPrice + element[3] : this.state.newTotalPrice - element[3]
        this.setState({ newTotalPrice: newPrice })
      }      
    });
  }

  buy = (event) => {
    if (event.target.checked) {
      // check price
      this.getBuyableRiderInfo(event.target.name, true)
      this.setState({ buySomeone: true })
      this.state.buyList.push(event.target.name)
    } else {
      this.getBuyableRiderInfo(event.target.name, false)
      const index = this.state.buyList.indexOf(event.target.name);
      if (index > -1) {
        this.state.buyList.splice(index, 1);
      }
    }
    if (this.state.buyList.length === 0) {
      this.setState({ buySomeone: false })
    }
  }

  // on form submit
  removeRiders = (e) => {
    e.preventDefault();
    // let sPass = e.target.pswd.value
    console.log("removing riders")
    // get removable riders from state
    // fetch delete from playersriders
  }

  render() {
    // modify data to please the eye
    const players = this.state.players
    //    console.log(players) // object
    let rows = []
    for (let i = 0; i < players.length; i++) {
      const originalRider = (players[i][3] === 1) ? <Image src={rightIcon} width="25" roundedCircle /> : <Image src={wrongIcon} width="25" roundedCircle />
      const row = <tr key={i}><td>{players[i][0]}</td>
        <td>{players[i][1]}</td>
        <td>{players[i][2]}</td>
        <td>{originalRider}</td>
        <td>{players[i][4]}</td>
        <td><Form.Check name={i} onChange={this.checked} /></td>
      </tr>
      rows.push(row)
    }

    const riders = this.state.riders
    let riderRows = []
    // number, name, team, price
    for (let i = 0; i < riders.length; i++) {
      const row = <tr key={riders[i][0]}><td>{riders[i][0]}</td>
        <td>{riders[i][1]}</td> 
        <td>{riders[i][2]}</td>
        <td>{riders[i][3]}</td>
        <td>{riders[i][4]}</td>
        <td><Form.Check name={riders[i][0]} onChange={this.buy} /></td>
      </tr>
      riderRows.push(row)
    }

    // if checked for removal, show remove button
    const removeButton = (this.state.removeSomeone) ? <Button type="submit">Remove rider(s)</Button> : <div />
    const buyButton = (this.state.buySomeone) ? <Button type="submit">Buy rider(s)</Button> : <div />

    return <Container>
      <div className="list row">
        <h1>Cycling Manager - My Team</h1>
        <Form onSubmit={this.removeRiders}>
          <table className="table table-striped">
            <thead>
              <tr>
                <td>Name</td>
                <td>Team</td>
                <td>Round joined</td>
                <td>Original rider</td>
                <td>Price</td>
                <td>Remove</td>
              </tr>
            </thead>
            <tbody>
              {rows}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>Total price:</td>
                <td>{this.state.totalPrice}</td>
                <td>{removeButton}</td>
              </tr>
            </tbody>
          </table>
        </Form>
      </div>
      <div>
        All riders
      <table className="table table-striped table-dark">
          <thead>
            <tr>
              <td>Number</td>
              <td>Name</td>
              <td>Rider's team</td>
              <td>Price</td>
              <td>Buy rider</td>
            </tr>
          </thead>
          <tbody>
            {riderRows}
            <tr>
                <td></td>
                <td></td>
                <td>New total price:</td>
                <td>{this.state.newTotalPrice}</td>
                <td>{buyButton}</td>
              </tr>
          </tbody>
        </table>
      </div>
    </Container>
  }
}

export default myTeam;