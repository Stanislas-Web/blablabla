import React, { useState, useEffect } from "react";
/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import API from "../../services/api/api";
import {
  groupeByYear,
  formatVbg,
  groupeByAttribut,
  getNbrVbgByProvinceInYear
} from "../../services/helpers/api.helper";
/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);

export default function AmchartRadarYear() {
  // Themes end

  /**
   * This is a copy of a chart created by Antti Lipponen: https://twitter.com/anttilip?lang=en Thanks a lot!
   */

  // disclaimer: this data is not accuarate, don't use it for any puroposes
  // first temperature is average for 1973-1980 period

  const [data, setData] = useState([]);
  const [dataFormatedAmchart, setDataFormatedAmchart] = useState([]);

  useEffect( () => {
    (async function(){
      //Le code de await doit être ici
      const dataVbg = await API.get("vbg").then((res) => res.data);
      const dataYear = groupeByYear(formatVbg(dataVbg), "dateSoumition");
      const dataProvince = groupeByAttribut(formatVbg(dataVbg), "province");
      const dataYearProvinces = [];
      const provinces = [];
      const dataFormated = [];
      for (const element in dataYear) {
        dataYearProvinces[element] = {};
        let group = groupeByAttribut(dataYear[element], "province");
        for (const prov in group) {
          if (group.hasOwnProperty(prov)) {
            dataYearProvinces[element][prov] = group[prov].length;
          }
        }
      }
  
      console.log(dataYearProvinces);
  
      for (const key in dataProvince) {
        provinces.push(key);
      }
  
      for (const province of provinces) {
        let format ={
          province : province
        }
        for (const year in dataYear) {
          if (dataYear.hasOwnProperty(year)) {
            format["value"+year] = getNbrVbgByProvinceInYear(formatVbg(dataVbg),province,year).length
          }
        }
        dataFormated.push(format)
      }
  
      setDataFormatedAmchart(dataFormated)
      } ) ()

  }, []);

  let temperatures = {
    AFRICA: [
      [
        "Algeria",
        16.99,
        0.55,
        0.09,
        0.44,
        -4.27,
        0.58,
        0.28,
        0.93,
        0.58,
        -0.5,
        2.37,
        -1.47,
        1.45,
        1.74,
        1.34,
        2.07,
        0.91,
        0.61,
        1.84,
        0.71,
        0.54,
        0.36,
        2.18,
        2.28,
        1.93,
        4.09,
        1.03,
        1.77,
        1.32,
        2.72,
        1.51,
        2.68,
        1.43,
        1.82,
        2.62,
        1.64,
        1.72,
        3.03,
        1.88,
        2.16,
        2.45,
        -0.54,
        3.03,
        1.52,
        3.32,
      ],
      [
        "Angola",
        23.86,
        1.64,
        0.58,
        -0.54,
        0.37,
        0.96,
        0.56,
        0.56,
        0.56,
        -1.61,
        -1.94,
        -1.94,
        -1.94,
        -2.46,
        -2.46,
        -2.46,
        -2.46,
        -2.46,
        -2.46,
        -2.46,
        -2.46,
        -2.46,
        -2.46,
        -2.46,
        -2.46,
        -2.46,
        -2.46,
        -2.46,
        -2.46,
        0.86,
        1.81,
        0.79,
        0.18,
        0.64,
        1.38,
        1.98,
        0.65,
        0.65,
        0.09,
        3.67,
        5.14,
        5.14,
        2.62,
        1.91,
        2.57,
      ],
      [
        "Botswana",
        21.64,
        0.33,
        -1.11,
        -0.36,
        -0.7,
        -0.1,
        -0.26,
        0.24,
        -0.92,
        -0.77,
        0.58,
        0.88,
        0.68,
        0.33,
        -1.9,
        1.8,
        1.41,
        0.3,
        2.82,
        0.84,
        0.3,
        0.98,
        1.19,
        2.32,
        1.36,
        1.64,
        1.68,
        2.41,
        0.34,
        1.46,
        2.44,
        1.63,
        0.87,
        2.18,
        0.41,
        0.84,
        0.64,
        0.58,
        1.6,
        0.89,
        0.87,
        0.83,
        0.24,
        1.09,
        2.2,
      ],
      [
        "Cameroon",
        24.36,
        0.16,
        -0.32,
        -0.6,
        -0.31,
        0.01,
        0.09,
        0.22,
        0.18,
        0.27,
        -0.07,
        0.36,
        0.03,
        0.18,
        0.33,
        0.76,
        0.43,
        0.11,
        0.96,
        1.1,
        -0.1,
        0.38,
        0.14,
        0.46,
        0.32,
        0.98,
        1.14,
        0.5,
        0.42,
        0.33,
        1.02,
        0.57,
        1.56,
        1.14,
        -1.78,
        0.84,
        0.47,
        0.71,
        3.01,
        -0.46,
        0.62,
        0.93,
        0.3,
        0.55,
        0.96,
      ],
      [
        "Chad",
        27.71,
        1.17,
        0.16,
        0.16,
        0.36,
        0.18,
        0.12,
        -2.14,
        -2.14,
        -2.14,
        -2.14,
        -2.14,
        -2.14,
        -2.14,
        -2.14,
        -0.52,
        0.86,
        -0.09,
        1.26,
        1.18,
        -0.27,
        0.74,
        1.43,
        0.42,
        0.04,
        0.97,
        -0.09,
        -1.44,
        0.37,
        0.95,
        1.15,
        1.21,
        1.41,
        0.42,
        1.9,
        1.14,
        0.13,
        1.52,
        1.98,
        1.16,
        0.87,
        1.77,
        1.53,
        0.86,
        1.33,
      ],
      [
        "Congo",
        25.22,
        0.17,
        -0.28,
        -0.45,
        -0.31,
        0.13,
        0.07,
        0.21,
        0.12,
        0.14,
        -0.31,
        0.5,
        0.54,
        0.11,
        0.24,
        0.66,
        0.63,
        0.51,
        -0.1,
        0.26,
        -0.64,
        -0.14,
        0.56,
        0.81,
        0.32,
        1.27,
        1.34,
        0.74,
        0.16,
        0.49,
        1.54,
        1.67,
        0.73,
        1.14,
        0.57,
        0.95,
        0.96,
        1.13,
        1.28,
        0.91,
        1.2,
        0.89,
        0.79,
        1.12,
        1.37,
      ],
      [
        "Egypt",
        22.71,
        -0.54,
        -0.06,
        -0.88,
        0.35,
        -0.27,
        2.35,
        0.56,
        -0.34,
        0.74,
        -0.34,
        -0.55,
        -0.19,
        1.07,
        -1.12,
        -0.37,
        -0.2,
        -0.16,
        -0.59,
        -0.19,
        -0.85,
        -0.44,
        0.79,
        -0.03,
        0.46,
        -0.87,
        0.68,
        1.25,
        -1.59,
        0.1,
        0.23,
        0.72,
        0.71,
        -0.01,
        0.91,
        0.68,
        0.93,
        0.79,
        2.17,
        0.14,
        0.57,
        -0.01,
        1.56,
        1.43,
        1.1,
      ],
      [
        "Ethiopia",
        19.63,
        0.43,
        -0.53,
        -0.37,
        -0.21,
        -0.04,
        -0.12,
        -0.07,
        0.41,
        -0.18,
        0.28,
        0.42,
        -0.16,
        -0.72,
        0.11,
        0.59,
        0.45,
        -1.68,
        0.52,
        0.86,
        0.96,
        1.11,
        -0.24,
        0.79,
        0.31,
        0.8,
        0.73,
        0.86,
        1.22,
        0.17,
        4.5,
        4.5,
        4.5,
        -5.07,
        0.97,
        -1.89,
        -2.05,
        1.61,
        1.18,
        2.43,
        1.51,
        1.88,
        1.49,
        1.84,
        1.54,
      ],
      [
        "Ghana",
        26.71,
        -0.01,
        -1.01,
        -0.19,
        -0.91,
        0.42,
        0.07,
        0.22,
        1.24,
        0.74,
        -2.58,
        -2.58,
        -2.58,
        -2.58,
        0.01,
        1.98,
        -0.77,
        -0.39,
        0.21,
        0.54,
        0.48,
        0.11,
        0.94,
        1.69,
        -0.23,
        0.44,
        1.02,
        0.97,
        0.15,
        2.47,
        1.91,
        0.78,
        1.11,
        0.8,
        1.92,
        1.58,
        0.65,
        0.87,
        1.23,
        0.7,
        0.88,
        1.52,
        0.19,
        0.84,
        1.36,
      ],
      [
        "Kenya",
        23.06,
        -2.26,
        -0.79,
        -0.14,
        0.35,
        0.21,
        0.08,
        0.27,
        0.46,
        0.28,
        0.5,
        0.48,
        0.23,
        0.14,
        0.27,
        0.77,
        0.74,
        0.13,
        0.31,
        0.39,
        0.44,
        0.06,
        0.43,
        0.47,
        0.36,
        0.63,
        1.03,
        0.38,
        0.67,
        0.54,
        0.87,
        0.83,
        0.92,
        0.98,
        0.99,
        0.91,
        0.83,
        1.23,
        1.19,
        1.18,
        0.93,
        0.94,
        1.07,
        1.44,
        1.24,
      ],
      [
        "Libya",
        21.54,
        -0.77,
        0.08,
        1.01,
        -0.04,
        -0.41,
        0.47,
        1.54,
        -0.86,
        0.23,
        0.2,
        -1.32,
        -0.53,
        0.28,
        -1.55,
        -0.13,
        0.63,
        0.08,
        0.32,
        -0.83,
        -0.55,
        0.52,
        -0.47,
        0.26,
        1.73,
        0.42,
        0.98,
        0.55,
        -0.17,
        0.49,
        -1.42,
        0.04,
        2.46,
        1.01,
        0.23,
        0.75,
        0.72,
        0.57,
        1.13,
        -7.21,
        3.03,
        1.2,
        -1.33,
        1.39,
        -0.68,
      ],
      [
        "Madagascar",
        24.01,
        0.71,
        -0.82,
        -0.57,
        0.35,
        0.91,
        -0.26,
        -0.07,
        -0.72,
        0.14,
        -0.01,
        0.51,
        -0.28,
        0.37,
        0.04,
        0.6,
        0.46,
        0.12,
        0.51,
        0.04,
        -0.72,
        -0.28,
        0.37,
        0.7,
        0.26,
        0.66,
        0.87,
        0.59,
        0.62,
        0.53,
        0.75,
        0.81,
        0.97,
        0.48,
        0.88,
        0.73,
        0.33,
        0.07,
        1.13,
        1.34,
        0.73,
        0.78,
        0.76,
        0.69,
        0.68,
      ],
      [
        "Mali",
        28.39,
        -0.03,
        -0.84,
        -0.41,
        -0.39,
        0.07,
        0.01,
        0.14,
        1.04,
        0.33,
        -0.34,
        0.22,
        0.78,
        -0.44,
        -0.98,
        0.7,
        -0.48,
        0.5,
        0.83,
        1.09,
        0.19,
        0.55,
        -0.06,
        0.56,
        0.36,
        0.91,
        1.13,
        0.83,
        0.37,
        0.82,
        1.89,
        0.88,
        1.33,
        1.09,
        0.76,
        1.44,
        0.48,
        0.73,
        1.58,
        1.43,
        0.86,
        0.37,
        0.56,
        1.22,
        1.26,
      ],
      [
        "Mauritania",
        27.57,
        -0.18,
        -1.05,
        -0.61,
        -1.07,
        0.14,
        -0.21,
        0.44,
        0,
        0.72,
        0.07,
        1.24,
        0.17,
        0.32,
        -0.48,
        1.36,
        0.54,
        0.31,
        0.58,
        -0.08,
        0.56,
        0.26,
        -0.91,
        0.17,
        0.84,
        -0.02,
        1.15,
        -1.02,
        0.4,
        0.44,
        0.48,
        0.86,
        0.78,
        0.22,
        1.12,
        -1.03,
        1.56,
        1.13,
        2.14,
        1.52,
        0.51,
        1.93,
        0.71,
        1.43,
        1.63,
      ],
      [
        "Morocco",
        17.58,
        -0.47,
        -0.62,
        -0.29,
        -0.57,
        -0.4,
        -0.08,
        0.72,
        0.55,
        0.29,
        0.22,
        0.64,
        0.21,
        0.58,
        0.55,
        1.36,
        0.45,
        0.62,
        0.89,
        -0.09,
        0.11,
        -0.12,
        0.63,
        1.44,
        0.93,
        1.54,
        1.39,
        0.87,
        1.17,
        1.57,
        1.21,
        1.47,
        1.36,
        1.41,
        1.99,
        1.03,
        1.02,
        2.15,
        2.06,
        1.76,
        1.55,
        1.08,
        1.42,
        1.35,
        1.97,
      ],
      [
        "Mozambique",
        23.62,
        0.02,
        -0.46,
        -0.59,
        0.22,
        0.17,
        0.22,
        0.22,
        0.07,
        -0.29,
        -0.17,
        0.64,
        0.25,
        0,
        -0.08,
        0.38,
        0.16,
        0.56,
        0.31,
        0.46,
        0.86,
        0.41,
        -0.3,
        0.95,
        0.63,
        -0.31,
        0.49,
        -0.23,
        1.36,
        0.33,
        0.49,
        0.92,
        0.94,
        1.18,
        0.65,
        1.53,
        0.97,
        0.79,
        1.86,
        3.11,
        0.17,
        -0.58,
        0.23,
        1.09,
        1.44,
      ],
      [
        "Namibia",
        20.84,
        -0.18,
        -1.9,
        -0.91,
        -1.88,
        -0.71,
        -1.07,
        -0.24,
        0.61,
        -0.33,
        1.13,
        0.71,
        1.62,
        0.12,
        -0.29,
        0.68,
        0.63,
        -0.36,
        0.41,
        -1.41,
        0.67,
        0.4,
        0.44,
        0.28,
        0.43,
        0.24,
        1.04,
        0.64,
        0.56,
        0.01,
        1.26,
        1.96,
        1.12,
        1.05,
        -0.09,
        -0.25,
        1.42,
        0.59,
        1.02,
        -0.66,
        0.66,
        1.24,
        0.87,
        2.64,
        1.88,
      ],
      [
        "Niger",
        28.41,
        0.65,
        -0.49,
        -0.29,
        0,
        -0.57,
        0.04,
        0.36,
        -0.38,
        -0.07,
        0.53,
        0.19,
        -0.16,
        0.28,
        0.37,
        0.46,
        -0.12,
        -0.73,
        0.78,
        -0.48,
        -0.09,
        0.5,
        -0.7,
        0.21,
        0.33,
        -0.44,
        1.65,
        -1.01,
        -0.82,
        0.14,
        0.97,
        0.48,
        0.77,
        1.44,
        1.45,
        0.61,
        0.17,
        1.22,
        1.31,
        1.02,
        0.66,
        1.23,
        0.94,
        0.71,
        1.27,
      ],
      [
        "Nigeria",
        26.35,
        0,
        -0.73,
        -0.05,
        1.29,
        0.65,
        -1.35,
        -0.55,
        0.22,
        0.15,
        0.15,
        0.15,
        0.15,
        0.15,
        2.4,
        2.4,
        2.4,
        2.4,
        2.4,
        2.4,
        2.4,
        2.4,
        2.4,
        2.4,
        2.4,
        2.4,
        1.52,
        0.73,
        1.87,
        0.66,
        0.19,
        0.51,
        0.37,
        1.01,
        -0.05,
        1.91,
        0.23,
        1.36,
        1.59,
        1.55,
        0.74,
        1.38,
        1.72,
        1.46,
        1.53,
      ],
      [
        "South Africa",
        17.03,
        -0.29,
        -0.54,
        0.45,
        -0.05,
        0.03,
        -0.53,
        -0.21,
        0.31,
        -0.73,
        -0.19,
        0.74,
        0.79,
        1.51,
        0.36,
        0.96,
        0.35,
        0.44,
        2.13,
        -0.26,
        1.02,
        1.31,
        0.47,
        1.36,
        0.42,
        0.02,
        0.5,
        1.83,
        0.71,
        0.31,
        1.28,
        1.45,
        1.57,
        1.11,
        1.08,
        0.51,
        0.58,
        0.86,
        1.29,
        0.56,
        1.16,
        1.59,
        0.97,
        1.63,
        1.73,
      ],
      [
        "Tanzania",
        24.09,
        -0.58,
        -0.93,
        0.12,
        0.28,
        0.41,
        -0.58,
        -0.18,
        0.26,
        0.21,
        0.56,
        0.19,
        -0.41,
        -0.59,
        -0.18,
        0.25,
        0.34,
        0.16,
        -0.52,
        0.19,
        -0.39,
        -0.39,
        1.93,
        1.99,
        2.96,
        1.89,
        1.93,
        2.42,
        -0.16,
        -0.79,
        0.53,
        1.06,
        0.57,
        1.11,
        1.01,
        0.79,
        0.12,
        0.72,
        1.02,
        0.57,
        0.62,
        0.44,
        0.38,
        0.43,
        0.51,
      ],
      [
        "Tunisia",
        18.81,
        0.07,
        -0.68,
        -0.31,
        -0.92,
        0.28,
        -0.22,
        0.15,
        -0.46,
        0.21,
        1.46,
        0.41,
        -0.21,
        0.51,
        0.76,
        1.13,
        1.01,
        0.34,
        1.02,
        -0.38,
        0,
        0.53,
        1.86,
        1.1,
        0.74,
        1.48,
        1.14,
        2.43,
        1.64,
        2.48,
        1.56,
        2.47,
        0.9,
        2.38,
        2.1,
        1.86,
        2.04,
        2.08,
        1.82,
        1.6,
        2.61,
        1.71,
        2.36,
        2.29,
        2.36,
      ],
      [
        "Zambia",
        21.76,
        3.24,
        -3.41,
        1.78,
        -0.2,
        -0.06,
        -3.73,
        1.24,
        -1.18,
        -1.47,
        1.4,
        2.4,
        0.78,
        0.65,
        -0.65,
        1.28,
        0.35,
        -0.7,
        0.44,
        -0.51,
        -0.28,
        -3.03,
        0.08,
        0.25,
        1.94,
        -2.09,
        4.19,
        1.19,
        -1.39,
        2.88,
        1.77,
        0.54,
        -0.14,
        3.77,
        -1.06,
        1.69,
        0.24,
        0.72,
        2.36,
        3.51,
        0.63,
        1.03,
        1.08,
        1.81,
        4.54,
      ],
      [
        "Zimbabwe",
        19.03,
        0.15,
        -0.56,
        -0.41,
        -0.39,
        0.21,
        -0.18,
        0.06,
        -0.16,
        -0.31,
        0.27,
        1.32,
        0.43,
        -0.03,
        0.14,
        1.04,
        0.21,
        0.07,
        0.68,
        0.45,
        0.91,
        -0.18,
        0.3,
        0.87,
        0.12,
        -0.25,
        0.61,
        -0.42,
        -0.36,
        0.39,
        0.77,
        0.48,
        0.37,
        1.07,
        0.32,
        0.42,
        0.94,
        0.47,
        0.61,
        1.61,
        0.34,
        0.2,
        0.56,
        0.7,
        1.42,
      ],
    ],
  };

  let startYear = 2018;
  let endYear = new Date().getFullYear();
  let currentYear = new Date().getFullYear();
  let colorSet = new am4core.ColorSet();

  let chart = am4core.create("chartRadarYear", am4charts.RadarChart);
  // chart.numberFormatter.numberFormat = "+#.0°C|#.0°C|0.0°C";
  chart.hiddenState.properties.opacity = 0;

  chart.startAngle = 270 - 180;
  chart.endAngle = 270 + 180;

  chart.padding(5, 15, 5, 10);
  chart.radius = am4core.percent(65);
  chart.innerRadius = am4core.percent(40);

  // year label goes in the middle
  let yearLabel = chart.radarContainer.createChild(am4core.Label);
  yearLabel.horizontalCenter = "middle";
  yearLabel.verticalCenter = "middle";
  yearLabel.fill = am4core.color("#673AB7");
  yearLabel.fontSize = 30;
  yearLabel.text = String(currentYear);

  // zoomout button
  let zoomOutButton = chart.zoomOutButton;
  zoomOutButton.dx = 0;
  zoomOutButton.dy = 0;
  zoomOutButton.marginBottom = 15;
  zoomOutButton.parent = chart.rightAxesContainer;

  // scrollbar
  chart.scrollbarX = new am4core.Scrollbar();
  chart.scrollbarX.parent = chart.rightAxesContainer;
  chart.scrollbarX.orientation = "vertical";
  chart.scrollbarX.align = "center";
  chart.scrollbarX.exportable = false;

  // vertical orientation for zoom out button and scrollbar to be positioned properly
  chart.rightAxesContainer.layout = "vertical";
  chart.rightAxesContainer.padding(120, 20, 120, 20);

  // category axis
  let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.dataFields.category = "province";

  let categoryAxisRenderer = categoryAxis.renderer;
  let categoryAxisLabel = categoryAxisRenderer.labels.template;
  categoryAxisLabel.location = 0.5;
  categoryAxisLabel.radius = 28;
  categoryAxisLabel.relativeRotation = 90;

  categoryAxisRenderer.fontSize = 11;
  categoryAxisRenderer.minGridDistance = 10;
  categoryAxisRenderer.grid.template.radius = -25;
  categoryAxisRenderer.grid.template.strokeOpacity = 0.05;
  categoryAxisRenderer.grid.template.interactionsEnabled = false;

  categoryAxisRenderer.ticks.template.disabled = true;
  categoryAxisRenderer.axisFills.template.disabled = true;
  categoryAxisRenderer.line.disabled = true;

  categoryAxisRenderer.tooltipLocation = 0.5;
  categoryAxis.tooltip.defaultState.properties.opacity = 0;

  // value axis
  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.min = -3;
  valueAxis.max = 6;
  valueAxis.strictMinMax = true;
  valueAxis.tooltip.defaultState.properties.opacity = 0;
  valueAxis.tooltip.animationDuration = 0;
  valueAxis.cursorTooltipEnabled = true;
  valueAxis.zIndex = 10;

  let valueAxisRenderer = valueAxis.renderer;
  valueAxisRenderer.axisFills.template.disabled = true;
  valueAxisRenderer.ticks.template.disabled = true;
  valueAxisRenderer.minGridDistance = 20;
  valueAxisRenderer.grid.template.strokeOpacity = 0.05;

  // series
  let series = chart.series.push(new am4charts.RadarColumnSeries());
  series.columns.template.width = am4core.percent(90);
  series.columns.template.strokeOpacity = 0;
  series.dataFields.valueY = "value" + currentYear;
  series.dataFields.categoryX = "province";
  series.tooltipText = "{categoryX}:{valueY.value}";

  // this makes columns to be of a different color, depending on value
  series.heatRules.push({
    target: series.columns.template,
    property: "fill",
    minValue: -3,
    maxValue: 6,
    min: am4core.color("#673AB7"),
    max: am4core.color("#F44336"),
    dataField: "valueY",
  });

  // cursor
  let cursor = new am4charts.RadarCursor();
  chart.cursor = cursor;
  cursor.behavior = "zoomX";

  cursor.xAxis = categoryAxis;
  cursor.innerRadius = am4core.percent(40);
  cursor.lineY.disabled = true;

  cursor.lineX.fillOpacity = 0.2;
  cursor.lineX.fill = am4core.color("#000000");
  cursor.lineX.strokeOpacity = 0;
  cursor.fullWidthLineX = true;

  // year slider
  let yearSliderContainer = chart.createChild(am4core.Container);
  yearSliderContainer.layout = "vertical";
  yearSliderContainer.padding(0, 38, 0, 38);
  yearSliderContainer.width = am4core.percent(100);

  let yearSlider = yearSliderContainer.createChild(am4core.Slider);
  yearSlider.events.on("rangechanged", function () {
    updateRadarData(
      startYear + Math.round(yearSlider.start * (endYear - startYear))
    );
  });
  yearSlider.orientation = "horizontal";
  yearSlider.start = 0.5;
  yearSlider.exportable = false;

  chart.data = dataFormatedAmchart;

  function generateRadarData() {
    let data = [];
    let i = 0;
    for (var continent in temperatures) {
      let continentData = temperatures[continent];

      continentData.forEach(function (province) {
        let rawDataItem = { province: province[0] };

        for (var y = 2; y < province.length; y++) {
          rawDataItem["value" + (startYear + y - 2)] = province[y];
        }

        data.push(rawDataItem);
      });

      createRange(continent, continentData, i);
      i++;
    }
    return data;
  }

  function updateRadarData(year) {
    if (currentYear != year) {
      currentYear = year;
      yearLabel.text = String(currentYear);
      series.dataFields.valueY = "value" + currentYear;
      chart.invalidateRawData();
    }
  }

  function createRange(name, continentData, index) {
    let axisRange = categoryAxis.axisRanges.create();
    axisRange.axisFill.interactionsEnabled = true;
    axisRange.text = name;
    // first province
    axisRange.category = continentData[0][0];
    // last province
    axisRange.endCategory = continentData[continentData.length - 1][0];

    // every 3rd color for a bigger contrast
    axisRange.axisFill.fill = colorSet.getIndex(index * 3);
    axisRange.grid.disabled = true;
    axisRange.label.interactionsEnabled = false;
    axisRange.label.bent = true;

    let axisFill = axisRange.axisFill;
    axisFill.innerRadius = -0.001; // almost the same as 100%, we set it in pixels as later we animate this property to some pixel value
    axisFill.radius = -20; // negative radius means it is calculated from max radius
    axisFill.disabled = false; // as regular fills are disabled, we need to enable this one
    axisFill.fillOpacity = 1;
    axisFill.togglable = true;

    axisFill.showSystemTooltip = true;
    axisFill.readerTitle = "click to zoom";
    axisFill.cursorOverStyle = am4core.MouseCursorStyle.pointer;

    axisFill.events.on("hit", function (event) {
      let dataItem = event.target.dataItem;
      if (!event.target.isActive) {
        categoryAxis.zoom({ start: 0, end: 1 });
      } else {
        categoryAxis.zoomToCategories(dataItem.category, dataItem.endCategory);
      }
    });

    // hover state
    let hoverState = axisFill.states.create("hover");
    hoverState.properties.innerRadius = -10;
    hoverState.properties.radius = -25;

    let axisLabel = axisRange.label;
    axisLabel.location = 0.5;
    axisLabel.fill = am4core.color("#ffffff");
    axisLabel.radius = 3;
    axisLabel.relativeRotation = 0;
  }

  let slider = yearSliderContainer.createChild(am4core.Slider);
  slider.start = 1;
  slider.exportable = false;
  slider.events.on("rangechanged", function () {
    let start = slider.start;

    chart.startAngle = 270 - start * 179 - 1;
    chart.endAngle = 270 + start * 179 + 1;

    valueAxis.renderer.axisAngle = chart.startAngle;
  });

  return (
    <div id="chartRadarYear" style={{ width: "100%", height: "420px" }}></div>
  );
}
