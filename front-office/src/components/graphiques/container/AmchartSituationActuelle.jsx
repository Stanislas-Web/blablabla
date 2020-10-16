import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import AmchartPieChronologie from "../AmchartPieChronologie";
import AmchartBar from "../AmchartBar";
import API from "../../../services/api/api";
import {
  formatVbg,
  formatDataAmchartChronologie,
  groupeByAttribut,
  groupeByProvince,
  groupeByYear,
  getLabelProvice,
  trieObject,
} from "../../../services/helpers/api.helper";
import "assets/css/containerChart.scss";


export default function AmchartSituationActuelle() {
  const [dataVbg, setdataVbg] = useState([]);
  useEffect(() => {
    API.get("vbg")
      .then((res) => {
        setdataVbg(formatVbg(res.data));
      })
      .catch((erreur) => console.log("une erreur est survenue"));
  }, []);

  const vueGlobale = groupeByYear(dataVbg,"dateSoumition");
  const typeViolence = formatDataAmchartChronologie(dataVbg, "type_violence");
  const auteurViol = formatDataAmchartChronologie(dataVbg, "auteur_viol");
  return (
    <div>
      <Card className="ContainerChart">
        <Card.Body>
          <Row>
          <Col sm="12">
              <Card>
                <Card.Header as="h5" className="text-center">
                  Vue globale
                </Card.Header>

                <AmchartBar
                  dataFormated={vueGlobale}
                  tagName="vueGlobale"
                />
              </Card>
              <br />
            </Col>
            <Col sm="12">
              <Card>
                <Card.Header as="h5" className="text-center">
                  Type des violences
                </Card.Header>

                <AmchartPieChronologie
                  dataFormated={typeViolence}
                  tagName="typeViolence"
                  noLabel={true}
                  viewLegend={true}
                />
              </Card>
              <br />
            </Col>
            <Col sm="12">
              <Card>
                <Card.Header as="h5" className="text-center">
                  Auteurs des abis
                </Card.Header>

                <AmchartPieChronologie
                  dataFormated={auteurViol}
                  tagName="auteurViol"
                  noLabel={true}
                  viewLegend={true}
                />
              </Card>
              <br />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </div>
  );
}
