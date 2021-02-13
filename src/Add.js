import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

class Add extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: false,
    }
  }

  submitHandler(e) {
    e.preventDefault()
    this.setState({ disabled: true })
    let result
    if (this.props.currentAd) {
      result = this.props.client.updateAd(this.props.currentAd._id, e.target.adName.value, e.target.location.value, e.target.date.value, e.target.price.value )
    } else {
      result = this.props.client.addAd(e.target.adName.value, e.target.location.value, e.target.price.value,e.target.date.value)
   
    }
    console.log(this.props.client.addAd)

    result.then(() => {
      this.setState({ disabled: false })
      document.getElementById("addForm").reset()
      this.props.refreshList()
    })
      .catch(() => {
        console.log("catch")
        alert("an error occured, please try again");
        this.setState({ disabled: false })
      })
  }

  render() {
    
    return (
      <>
<Container>
     <h2 className="add">  {this.props.currentAd ? "Update" : "Add Event "}</h2> <br />
     
        <form onSubmit={(e) => this.submitHandler(e)} id="addForm" >
          Name: <br />
          <Form.Control   type="text" defaultValue={this.props.currentAd?.name} name="adName" disabled={this.state.disabled} /><br />
          Location: <br />
          <Form.Control  type="text" defaultValue={this.props.currentAd?.location} name="location" disabled={this.state.disabled} /><br />
          
          Price:<br />
          <Form.Control   type="text" defaultValue={this.props.currentAd?.price} name="price" disabled={this.state.disabled} /><br />
          Date: <br />
          <Form.Control   type="text" defaultValue={this.props.currentAd?.date} name="date" disabled={this.state.disabled} /><br /><br/>
          <Button type="submit" disabled={this.state.disabled}> Submit </Button>
        </form>
        </Container>
        
      </>
    )
  }
}

export default Add;
