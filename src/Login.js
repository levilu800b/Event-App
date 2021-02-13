import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './App.css';

import Container from 'react-bootstrap/Container';
class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false
    }
  }

  submitHandler(e) {
    e.preventDefault()
    this.setState({ disabled: true })
    this.props.client.login(e.target.username.value, e.target.password.value)
      .then((response) => {
        this.setState({ disabled: false })
        this.props.loggedIn(response.data.token)
      })
      .catch(() => {
        alert("an error occured, please try again");
        this.setState({ disabled: false })
      })
  }

  render() {
    return (
      <>
        <Navbar   bg="primary" variant="dark"   expand="md">
       <Navbar.Brand>Event App </Navbar.Brand>
       </Navbar>
       <Container>
  <Row className="home">
    <Col>
    <h2 className="Color">Event App </h2><br/>
    <h4 className="Color">What?</h4>
    <p> Event App is the world’s leading event technology platform trusted by over 50,000 event professionals in more than 50 countries.</p>
    <p>Our community of customers includes top shows from across the world; amazing performing arts venues; global convention centers; some of the world’s most visited museums, professional sports arenas, and stadia; plus, other unique events and venues of all shapes and sizes.</p>
    <p>Together, we can create extraordinary events.</p>


    </Col>
    <Col>
    <h3 className="Color">Login</h3> <br /><br />
  <form onSubmit={(e) => this.submitHandler(e)} >
       <p>Username</p> 
          <Form.Control type="text" name="username"  placeholder="Enter you name"disabled={this.state.disabled} /><br />
      <p>Password</p>
          <Form.Control  type="password" name="password"  placeholder="Password" disabled={this.state.disabled} /><br /><br />
          <Button variant="primary" type="submit" disabled={this.state.disabled}> Submit </Button>
        </form>
    
       </Col>
        </Row>
  

</Container>

     
      </>
    )

  }
}

export default Login;
