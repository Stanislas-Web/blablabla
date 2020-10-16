import React, { useState, useEffect,lazy } from "react";
import { CCard, CCardBody, CCardHeader, CRow, CCol } from "@coreui/react";
import FilterInputVbg from "../../../components/FilterInputVbg";

import AmcharBar from "../../../components/amCharts/AmchartBar";
import AmchartPie from "../../../components/amCharts/AmchartPie";
import API from "../../../services/api";
import { getVbg, dataVbg } from "../../../services/data_api";
import {
  groupeByAttribut,
  formatVbg,
} from "../../../services/helpers/api.data.helper";

const WidgetsStatGlobal = lazy(() =>
  import("../../../components/widgets/WidgetsStatGlobal")
);
const Charts = () => {
  let [dataGraph, setDataGraph] = useState([]);

  useEffect(() => {
    API.get("vbg").then((res) => {
      dataGraph = {
        type_violence: groupeByAttribut(formatVbg(res.data), "type_violence"),
      };
      setDataGraph(dataGraph);
    });
  }, []);

  const getData = () => {
    return dataGraph["type_violence"];
  };

  return (
    <>
      <CRow>
        <CCol sm="12">
        <CCard>
          <CCardBody>
            <FilterInputVbg />
          </CCardBody>
        </CCard>
        </CCol>
      </CRow>
      <WidgetsStatGlobal/>  
      <CRow>
        <CCol sm="12">
          <CCard>
            <CCardHeader>Types des violences</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm="6">
                  <CCard>
                    <CCardBody>
                      <AmcharBar
                        data={dataVbg.then((res) =>
                          groupeByAttribut(formatVbg(res.data), "type_violence")
                        )}
                        tagName="graph_type_violence_bar"
                      />
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol sm="6">
                  <CCard>
                    <CCardBody>
                      <AmchartPie
                        data={dataVbg.then((res) =>
                          groupeByAttribut(formatVbg(res.data), "type_violence")
                        )}
                        tagName="graph_type_violence_pie"
                      />
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm="12">
          <CCard>
            <CCardHeader>Tranche d'age</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm="6">
                  <CCard>
                    <CCardBody>
                      <AmcharBar
                        data={dataVbg.then((res) =>
                          groupeByAttribut(
                            formatVbg(res.data),
                            "tranche_age_victime"
                          )
                        )}
                        tagName="graph_tranche_age_bar"
                      />
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol sm="6">
                  <CCard>
                    <CCardBody>
                      <AmchartPie
                        data={dataVbg.then((res) =>
                          groupeByAttribut(
                            formatVbg(res.data),
                            "tranche_age_victime"
                          )
                        )}
                        tagName="graph_tranche_age_pie"
                      />
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol sm="12">
          <CCard>
            <CCardHeader>Auteurs des viols</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol sm="6">
                  <CCard>
                    <CCardBody>
                      <AmcharBar
                        data={dataVbg.then((res) =>
                          groupeByAttribut(formatVbg(res.data), "auteur_viol")
                        )}
                        tagName="graph_auteur_viol_bar"
                      />
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol sm="6">
                  <CCard>
                    <CCardBody>
                      <AmchartPie
                        data={dataVbg.then((res) =>
                          groupeByAttribut(formatVbg(res.data), "auteur_viol")
                        )}
                        tagName="graph_auteur_viol_pie"
                      />
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Charts;
