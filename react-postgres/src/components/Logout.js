import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class Logout extends React.Component {

  logout = (e) => {
    console.log("logging out")
    sessionStorage.clear()
    e.preventDefault()
    window.location.reload()
  }
  render() {
    let renderContent = ''
    if (sessionStorage.getItem("logInfo") == null) {
      renderContent = <div>You've logged out</div>
    } else {
      renderContent = <div>
        <h1>Cycling Manager - Logout</h1>
        <Button onClick={this.logout}>Logout</Button>
      </div>
    }
    return <Container>
      {renderContent}
    </Container>
  }
}

export default Logout;