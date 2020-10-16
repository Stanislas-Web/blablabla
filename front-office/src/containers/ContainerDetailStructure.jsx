import React,{Component} from 'react';
import {Card,Row,Col, Button} from 'react-bootstrap'
import "assets/css/DetailStructure.scss"
import "components/button/Button"


class DetailStructure extends Component {
  
  

  render() { 
    return(
      <>

<Card className="ContainerCarte" >
<Card.Img variant="top" src="https://www.jeuneafrique.com/medias/2018/03/09/10599361_514602405341918_6820721708134085763_n-592x296-1520591058.jpg" class="card-img-top embed-responsive-item" />
      <Card.Body className="card_body">
      <Card.Title>Hopital du cinquantenaire</Card.Title>
      <p className="distance">Service de centé à 10km</p>
      <Button variant="primary" className="bouton_carte" onClick={()=> window.location.href="/#plaintes"}>Soumettre un cas</Button>
        <Card.Text>
          <h5>Contact</h5>
          <span>Tel:  +243852282012</span> <br/>
          <span>gmail:  +jonkal38@gmail.com</span>
          <h5>Adresse</h5>
          <span>Haut commandement</span> <br/>
          <span>Gombe Kinshasa</span> <br/>
          <span>Republique democratique du congo</span> <br/>
        </Card.Text>
      </Card.Body>
    </Card>
      </>
    
    )
  }
}
 

 
export default DetailStructure;