import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
// set sessionStorage keys "loggedIn,id" to "true,myid" if logged in
// every .js file should check this, especially navigation

class Login extends React.Component {
  // state: register is false if logging in, if trying to register, setState and change form accordingly
  state = { loggedIn: false, pass: '', id: '', number: '' }

  getLogInfoFromDatabase = async () => {
    console.log("getloginfo")
    // Do async job
    return fetch('http://localhost:3001')
      .then(response => response.json())
  }

  logSuccessWriteSesStore = (id, pass, id_number) => {
    // after successful login write sessionStorage
    let logInfo = [];
    logInfo[0] = 'true'
    logInfo[1] = id
    logInfo[2] = pass
    logInfo[3] = id_number
    sessionStorage.setItem("logInfo", JSON.stringify(logInfo));
    console.log("sessionStorage written: ")
    // redirect to home, change navi
  }

  submitForm = (e) => {
    e.preventDefault()
    let sPass = e.target.pswd.value
    let sId = e.target.id.value
    console.log("given id: " + sId + " given pass: " + sPass)

      ; (async () => {
        const response = await this.getLogInfoFromDatabase()
        console.log("fetched results: " + response)

        // check if response contains id and pass
        let foundID = 0;
        for (let i = 0; i < response.length; i++) {
          if (response[i].name === sId) {
            if (response[i].password === sPass) {
              foundID = response[i].id;
              break;
            }
          }
        }
        console.log("found id: " + foundID)

        if (foundID !== 0) {
          this.setState({ loggedIn: true, id: sId, pass: sPass, number: foundID })
          this.logSuccessWriteSesStore(sId, sPass, foundID)
          window.location.reload();
        } else {
          // no matching log info
          e.preventDefault()
          alert("id and pass did not match")
        }
      })()
  }  

  render() {
    let renderContent = ''
    if (this.state.loggedIn) {
      renderContent = <div>{this.state.id} logged in</div>
    } else {
      renderContent =
        <Form onSubmit={this.submitForm}>
          <Row className="align-items-center">
            <Col>
              <h1>Cycling Manager - Login</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Control name="id"
                type="text"
                placeholder="id" />
              <Form.Control name="pswd"
                type="password"
                placeholder="password" />
            </Col>
            <Col>
              <span className="align-bottom">
                <Button type="submit">
                  Login
            </Button>
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

export default Login;
