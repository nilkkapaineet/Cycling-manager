import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

class Register extends React.Component {
  // state: register is false if logging in, if trying to register, setState and change form accordingly
  state = {
    dbID: '',
    id: '',
    pass: '',
    passConfirm: '',
    passConfirmColor: 'red',
    teamName: '',
    loggedIn: false
  }

  registerNewPlayer = (name, password, teamName) => {
    console.log("body is: " + name + ", " + password + ", " + teamName)
    fetch('http://localhost:3001/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password, teamName }),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        console.log(data)
        const obj = JSON.parse(data)
        console.log("id: " + obj.id)
        this.setState({dbID: obj.id, loggedIn: true})
        this.logSuccessWriteSesStore(name, password)
        console.log(sessionStorage.getItem("logInfo"))
      });
  }

  logSuccessWriteSesStore = (id, pass) => {
    // after successful login write sessionStorage
    let logInfo = [];
    logInfo[0] = 'true'
    logInfo[1] = id
    logInfo[2] = pass
    logInfo[3] = this.state.dbID
    console.log("dbid: " + logInfo[3])
    sessionStorage.setItem("logInfo", JSON.stringify(logInfo));
    console.log("sessionStorage written")
    // redirect to home, change navi
    window.location.reload()
  }

  setPassword = (e) => {
    this.setState({ pass: e.target.value })
    e.preventDefault()
  }

  matchingPassword = (e) => {
    this.setState({ passConfirm: e.target.value })
    if (this.state.pass === this.state.passConfirm) {
      this.setState({ passConfirmColor: 'green' })
    } else {
      this.setState({ passConfirmColor: 'red' })
      console.log("wrong, don't allow submit")
    }
  }

  submitForm = (e) => {
    if (this.state.passConfirmColor === 'red') {
      e.preventDefault()
      alert("there's problem with logging information")
    } else {
      let sPass = e.target.pswd.value
      let sPass2 = e.target.pswd2.value
      let sId = e.target.id.value
      let sTeamName = e.target.teamName.value
      this.setState({ id: sId, teamName: sTeamName })
      console.log("id: " + sId + " pass: " + sPass + " pass2: " + sPass2)
      this.registerNewPlayer(sId, sPass, sTeamName)
    }
  }

  render() {
    let renderContent = ''
    if (this.state.loggedIn) {
      renderContent = <Redirect to="/" />
    } else {
    // conditional rendering of submit button
    const submitButton = (this.state.passConfirmColor === 'green') ? <Button type="submit">Register</Button> : <div />
    renderContent =
      <Form onSubmit={this.submitForm}>
        <Row className="align-items-center">
          <Col>
            <h1>Cycling Manager - Register</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control name="id" placeholder="id" />
            <Form.Control name="teamName" placeholder="your team name" />
            <Form.Control name="pswd"
              onChange={this.setPassword}
              type="password"
              placeholder="password" />
            <Form.Control
              name="pswd2"
              onKeyUp={this.matchingPassword}
              style={{ color: this.state.passConfirmColor }}
              onChange={this.matchingPassword}
              type="password"
              placeholder="password again" />
          </Col>
          <Col>
            <span className="align-bottom">
              {submitButton}
            </span>
          </Col>
        </Row>
      </Form>
    }
    return <Container>
      {renderContent}
      </Container>
    
  }
}

export default Register;
