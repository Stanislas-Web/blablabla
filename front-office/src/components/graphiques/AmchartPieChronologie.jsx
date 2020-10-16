// import React, { Component } from "react";
// import * as am4core from "@amcharts/amcharts4/core";
// import * as am4charts from "@amcharts/amcharts4/charts";
// import am4themes_animated from "@amcharts/amcharts4/themes/animated";
// import am4themes_dataviz from "@amcharts/amcharts4/themes/amcharts";
// import { formatDataForAmChartPie } from "../../services/helpers/amChart.helper";
// class AmchartPie extends Component {
//   // constructor(){
//   //   super()
//   //   this.props.tagName = this.props.tagName.replace(" ","-");
//   // }
//   componentDidMount() {
//     am4core.useTheme(am4themes_dataviz);
//     am4core.useTheme(am4themes_animated);
//     const { dataFormated, tagName } = this.props;
//     let chart = am4core.create(tagName, am4charts.PieChart);
//     chart.data = formatDataForAmChartPie(dataFormated);
//     // raduis
//     this.props.raduis
//       ? (chart.innerRadius = this.props.raduis)
//       : (chart.innerRadius = 29);
//     chart.width = am4core.percent(90);
//     chart.height = am4core.percent(90);
//     // Création des series
//     let pieSeries = chart.series.push(new am4charts.PieSeries());
//     pieSeries.dataFields.value = "nombre";
//     pieSeries.dataFields.category = "label";
//     // pieSeries.ticks.template.disabled = true;

//     // view label
//     if (this.props.noLabel) pieSeries.labels.template.disabled = true;

//     // legend
//     if (this.props.viewLegend) {
//       chart.legend = new am4charts.Legend();
//       // chart.legend.position = "right";
//       chart.legend.maxHeight = 75;
//       chart.legend.scrollable = true;
//     }
//   }

//   render() {
//     return (
//       <div>
//         <div
//           id={this.props.tagName}
//           style={{
//             width: "100%",
//             height: this.props.height ? this.props.height : "250px",
//           }}
//         ></div>
//       </div>
//     );
//   }
// }

// export default AmchartPie;

import React from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4themes_dataviz from "@amcharts/amcharts4/themes/amcharts";
import { formatDataForAmChartPie } from "../../services/helpers/amChart.helper";

export default function AmchartPieChronologie({
  dataFormated,
  tagName,
  raduis,
  noLabel,
  viewLegend,
  height,
}) {
  am4core.useTheme(am4themes_dataviz);
  am4core.useTheme(am4themes_animated);
  const chartData = dataFormated;

  // Create chart instance
  const chart = am4core.create(tagName, am4charts.PieChart);

  // Add data
  chart.data = chartData[new Date().getFullYear()];

  // Add label
  chart.innerRadius = 100;
  let label = chart.seriesContainer.createChild(am4core.Label);
  label.text = new Date().getFullYear();
  label.horizontalCenter = "middle";
  label.verticalCenter = "middle";
  label.fontSize = 20;

  // Add and configure Series
  let pieSeries = chart.series.push(new am4charts.PieSeries());
  pieSeries.dataFields.value = "nombre";
  pieSeries.dataFields.category = "label";

  // Animate chart data
  let currentYear = 2018;
  function getCurrentData() {
    label.text = currentYear;
    let data = chartData[currentYear];
    currentYear++;
    if (currentYear > new Date().getFullYear()) currentYear = 2018;
    return data ? data : [];
  }

  function loop() {
    //chart.allLabels[0].text = currentYear;
    let data = getCurrentData();
    
    for (var i = 0; i < data.length; i++) {
      chart.data[i].nombre = data[i].nombre;
    }
    chart.invalidateRawData();
    chart.setTimeout(loop, 4000);
  }

  loop();

  // raduis
  raduis ? (chart.innerRadius = this.props.raduis) : (chart.innerRadius = 29);
  chart.width = am4core.percent(90);
  chart.height = am4core.percent(90);
  // Création des series
//   let pieSeries = chart.series.push(new am4charts.PieSeries());
//   pieSeries.dataFields.value = "nombre";
//   pieSeries.dataFields.category = "label";
  // pieSeries.ticks.template.disabled = true;

  // view label
  if (noLabel) pieSeries.labels.template.disabled = true;

  // legend
  if (viewLegend) {
    chart.legend = new am4charts.Legend();
    // chart.legend.position = "right";
    chart.legend.maxHeight = 75;
    chart.legend.scrollable = true;
  }
  return (
    <div>
      <div
        id={tagName}
        style={{
          width: "100%",
          height: height ? height : "250px",
        }}
      ></div>
    </div>
  );
}
