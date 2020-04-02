import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

class Register extends React.Component {
  // state: register is false if logging in, if trying to register, setState and change form accordingly
  state = {
    id: '',
    pass: '', 
    passConfirm: '', 
    passConfirmColor: 'red'
  }

  componentDidMount() {
  }

  fetchLogInfoFromDatabase() {
    // id should be available
  }

  sendLogInfoToDatabase() {

  }

  logSuccessWriteSesStore = (id, pass) => {
    // after successful login write sessionStorage
    let logInfo = [];
    logInfo[0] = 'true'
    logInfo[1] = id
    logInfo[2] = pass
    sessionStorage.setItem("logInfo", JSON.stringify(logInfo));
    console.log("sessionStorage written")
    // redirect to home, change navi
  }

  setPassword = (e) => {
    this.setState({pass: e.target.value})
    e.preventDefault()
  }

  matchingPassword = (e) => {
    this.setState({passConfirm: e.target.value})
    if (this.state.pass === this.state.passConfirm) {
      this.setState({passConfirmColor: 'green'})
    } else {
      this.setState({passConfirmColor: 'red'})
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
      console.log("id: " + sId + " pass: " + sPass + " pass2: " + sPass2)  
      this.logSuccessWriteSesStore(sId, sPass)
    }
  }

  render() {
    // conditional rendering of submit button
    const submitButton = (this.state.passConfirmColor === 'green') ? <Button type="submit">Register</Button> : <div />
    return <Container>
      <Form onSubmit={this.submitForm}>
        <Row className="align-items-center">
          <Col>
            <h1>Cycling Manager - Register</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control name="id" placeholder="id" />
            <Form.Control name="pswd" 
              onChange={this.setPassword} 
              type="password" 
              placeholder="password" />
            <Form.Control 
                name="pswd2" 
                onKeyUp={this.matchingPassword} 
                style={{color: this.state.passConfirmColor}} 
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
    </Container>
  }
}

export default Register;
