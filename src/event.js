import React from 'react';
import Add from "./Add"
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './App.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'


class Event extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ads: [],
      currentAd: undefined
    }
  }

  refreshList(){
    this.props.client.getAds()
    .then((response) => this.setState({ ads: response.data }))
  }

  removeAdvert(id){
    this.props.client.removeAd(id)
    .then(this.refreshList())
  }

  updateAdvert(ad){
    this.setState({currentAd: ad})
  }

  componentDidMount() {
    this.refreshList()
  }

  buildrows() {
    return this.state.ads.map((current) => {
      return (<tr key={current._id}>
        <td>{current.name}</td>
        <td>{current.location}</td>
       
        <td>£{current.price}</td>
        <td>{current.date}</td>
        
        <td>
          <Button onClick={()=> this.removeAdvert(current._id)}> remove</Button>{' '}
          <Button onClick={()=> this.updateAdvert(current)}> update</Button>
        </td>
       
      </tr>)
    })
  }

  render() {
    return (
      <>
       <Navbar   bg="primary" variant="dark"   expand="md">
       <Navbar.Brand>Event App </Navbar.Brand>
       </Navbar>
       <Row className="home">
       <Col sm={1}></Col>
           <Col sm={3}>
        <Add client={this.props.client} refreshList={() => {
          this.refreshList()
          this.setState({
            currentAd: undefined})
          }} 
          currentAd={this.state.currentAd}/>
          </Col>
          <Col sm={7}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="Color">  Name  </th>
              <th className="Color"> Location </th>
              <th className="Color">  Price  </th>
              <th className="Color">  Date  </th>
             
              <th className="Color"> Action</th>
            </tr>
          </thead>
          <tbody>
            {this.buildrows()}
          </tbody>
        </Table>
        <br /><br />
        </Col>
        </Row>
      </>
    )

  }
}

export default Event;
