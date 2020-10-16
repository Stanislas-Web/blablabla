import React, {Component} from "react";
import styled from 'styled-components'
import { Button, Form, Row, Col } from 'react-bootstrap';
import "../../assets/css/steepform.scss"
import "../../assets/css/Adress.scss"
import Api from '../../services/api/api'

// import ItemForm from "./ItemForm";
// import StateDrop from "./StateDrop";


const Btn = styled.ul`
.btn1
{ 
  background: #ffffff;
  border-radius: 400px;
  // margin-right: 60px;
  padding: 20px 28px;
  border: 1px solid #cccccc;
}
.btn2
{
  background: #ffffff;
  border-radius: 400px;
  // margin-right: 60px;
  padding: 20px 28px;
  border: 1px solid #cccccc;
}
.btn3
{
  background: #0077FF;
  color: white;
  font-size: 18px;
  font-weight: bold;
  border: 1px solid black;
  border-radius: 400px;
  padding: 20px 28px;
  border: 1px solid #0077FF;
}
.stepwizard-row:before {
  top: 24px;
  bottom: 0;
  position: absolute;
  content: " ";
  width: 70%;
  height: 2px;
  background-color: #ccc;
  margin-left: 52px
}
.stepwizard-step {
  display: table-cell;
  text-align: center;
  position: relative;
  margin-left: 100px;
}
.stepwizard-row {
  display: table-row;
  margin-left: 300px;
}
.stepwizard {
  display: table;
  width: 40%;
  position: relative; 
  margin: auto;
}
.form{
  position: auto;
  width: 50%;
  height: 70%;
  background: red;
}
// Btn{
//   margin: auto;
// }
container{
  width: 60%;
  background: red;
}
h4{
  margin-top: 15px;
}
.container{
  width: 600px;
  height: 500px;
  background: #ffffff;
  margin: auto;
}

` 

export class Address extends Component {

  state = {
    globalvbg: [],
    errorType_violence:"",
    errorDescription:"",
  }

  componentDidMount() {
    Api.get("globalvbg").then((res) => {
      this.setState({ globalvbg: res.data.type_violences });
    });
  }

  continue = (Type_violence, Description)=>{
    let verificateur=true;
    
    if(Type_violence==""){
      this.setState({errorType_violence:"Ce champ ne peut pas etre vide"})
      verificateur=false
    }

    // if(Description==""){
    //   this.setState({errorDescription:"Ce champ ne peut pas etre vide"})
    //   verificateur=false
    // }
  
    if(verificateur){
      this.props.Soummition();
    }
}

back = e=>{
  e.preventDefault();
  this.props.prevStep();
}

// Submit = e =>{
//   e.preventDefault();
//   console.log(values);
// }

render(){
  var {values, inputChange, Soummition} = this.props
  
  return (
    <div className="form">
    <Btn>
  <div className="mobile">
  <div className="stepwizard col-md-offset-3">
 <div className="">
 <div className="stepwizard-step">
 <button className="btn1">1</button>
 <h6 className="btn1Text">Identité</h6>
 </div>
 <div className="stepwizard-step">
 <button className="btn2" onClick={this.back}>2</button>
 <h6 className="btn2Text">Contact</h6>
 </div> 
 <div className="stepwizard-step">
  <button className="btn3">3</button>
  <h6 className="btn3Text">Description</h6>
  </div>
  </div>
  </div>

  </div>
  <div className="desktop">
  <div className="stepwizard col-md-offset-3">
 <div className="stepwizard-row setup-panel">
 <div className="stepwizard-step">
 <button className="btn1">1</button>
 <h6 className="btn1Text">Identité</h6>
 </div>
 <div className="stepwizard-step">
 <button className="btn2" onClick={this.back}>2</button>
 <h6 className="btn2Text">Contact</h6>
 </div> 
 <div className="stepwizard-step">
  <button className="btn3">3</button>
  <h6 className="btn3Text">Description</h6>
  </div>
  </div>
  </div>

  </div>
  </Btn>
  <br/>
<br/>


<div className="formContainerAdress responsive">
<Form className="formulaire">


              <Form.Control as="select" onChange={inputChange('Type_violence')} value={values.Type_violence}>
              <option value="" selected disabled hidden>
                  sélectionnez les types de violence
                </option>
      { this.state.globalvbg.map(globalvbg => <option value={globalvbg} key={globalvbg}>{globalvbg}</option>)}
              </Form.Control>
              <span>{this.state.errorType_violence}</span>
              <span>{this.state.errorDescription}</span>
              <br />
            
            <Form.Control as="textarea" onChange={inputChange('Description')} value={values.Description} placeholder="Description">
            </Form.Control>
            <span>{this.state.errorDescription}</span>
            
          
          <br/>
          <div className="text-center">
              <Button variant="primary"  style={{paddingLeft:"30px", paddingRight:"30px"}} type="submit" onClick={(e)=> {e.preventDefault(); this.continue(values.Type_violence, values.Description)}} className="bouton_form">Soumettre</Button>
          </div>
</Form>
</div> 




<br/>
<br/>
</div>
  )
}
}
export default Address;




