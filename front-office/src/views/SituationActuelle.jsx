import React, { useState } from "react";
import CarteCasVbg from "../components/cartes/CarteCasVbg";
import AmchartSituationActuelle from "../components/graphiques/container/AmchartSituationActuelle"
import "../assets/css/ButtonCas.scss";
import ButtonCas from "../components/button/Button";

export default function SituationActuelle() {
  return (
    <>
      <div className="maps" style={{ display: "fixed" }}>
        <CarteCasVbg />
      </div>
      <ButtonCas />
      {/* <ContainerChart /> */}
      <AmchartSituationActuelle/>
    </>
  );
}
