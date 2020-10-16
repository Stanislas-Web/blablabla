import React from "react";
import { Button } from 'react-bootstrap';
import "assets/css/ButtonCas.scss"

const Boutton = ()=>{

    return(
        <div className="text-center">
        <Button variant="primary" className="buttonCas" onClick={()=> window.location.href="/#plaintes"}>Soumettre un cas </Button>
        </div>

    )
}

export default Boutton;