import React,{useState,useEffect} from "react";
import { Card, Button, Row, Col} from "react-bootstrap";
import { Link} from 'react-router-dom';

import "assets/css/DetailStructure.scss";

const myStyle={
  height:"30px",
  width:"30px",
  border:"1px solid #cccccc",
  borderRadius:"50px",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  color:"#757575",
  cursor:"pointer",
  fontWeight:"300",
  fontSize:"15px",
  position:"absolute",
  top:"2px",
  zIndex:"3",
  right:"0",
  background:"rgba(255,255,255, 0.9)",
  
}

export default function CardDetailStructure({ structure , visible }) {
  // const [visible, setVisible] = useState(1)
  // const notVisible = ()=>{
  //   localStorage.clear();
  //   window.location.href="/#"
  //   setTimeout(() => {
  //     window.location.href="/#structures"
  //   }, 50);
  // }
  // useEffect(() => {
  //   setVisible(parseInt(localStorage.getItem("visible")))

  // }, []);

  return (
    <>{
      (visible)?
    <div className="ContainerCarte">
    <Card>
    <div style={myStyle} onClick={visible=false}>X</div>
      <div className="embed-responsive embed-responsive-16by9" style={{border:"1px solid #cccccc"}}>
        <img
          class="card-img-top embed-responsive-item"
          src={
            structure.img !== 'null' 
              ? structure.img
              : "https://presidence.cd/imgs/logo.png"
          }
          alt=""
        />
      </div> 
      <Card.Body  style={{padding:"0 50px"}}>
        <Card.Title style={{fontWeight:"400"}} className="text-center">{structure.nom}</Card.Title>
        <Card.Text style={{fontWeight:"300"}} className="text-center" >{structure.type}</Card.Text>
        <div className="text-center">
        <Link to={`/plaintes?structure=${structure.id}`}><Button className="text-center" style={{background:"#0077FF", color:"300", width:"249px"}} variant="primary"> Soummetre un cas </Button></Link> 
        </div> <br/>
   
        <Card.Title style={{fontWeight:"400"}}>Contacts</Card.Title>
        <Card.Text style={{fontWeight:"300"}} >Tél:  &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{structure.numerosTelephone}</Card.Text>
        <Card.Title style={{fontWeight:"400"}}>Adresse</Card.Title>
        <Card.Text  style={{fontWeight:"300"}}  >{structure.adresse}</Card.Text>
        

        {/* <table className="responsive">
          <tbody>
            <tr>
              <th>Contacts</th>
            </tr>
            <tr>
              <td>Tél</td>
              <td>{structure.numerosTelephone}</td>
            </tr>
            <tr>
              <th>Adresse</th>
            </tr>
            <tr>
                <td>
                {structure.adresse}
                </td>
                </tr>
          </tbody>
        </table> */}
      </Card.Body>
    </Card>
  </div>:""}

    </>
  );
}
