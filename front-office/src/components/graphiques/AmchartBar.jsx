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

export default function AmchartBar({ dataFormated, tagName, height }) {
    am4core.useTheme(am4themes_dataviz);
  am4core.useTheme(am4themes_animated);
  am4core.color("#FF6F91");
  const chart = am4core.create(tagName, am4charts.XYChart);

  // Add data
  chart.data = formatDataForAmChartPie(dataFormated);
  // Create axes

  let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
  categoryAxis.dataFields.category = "label";
  categoryAxis.renderer.grid.template.location = 0;
  categoryAxis.renderer.minGridDistance = 20;
  // categoryAxis.renderer.line.strokeWidth = 2;
  categoryAxis.fontSize = 12
  categoryAxis.renderer.labels.template.adapter.add("dy", function (
    dy,
    target
  ) {
    if (target.dataItem && target.dataItem.index & (2 == 2)) {
      return dy + 25;
    }
    return dy;
  });

  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
  valueAxis.fontSize = 12
  // Create series
  let series = chart.series.push(new am4charts.ColumnSeries());
  series.dataFields.valueY = "nombre";
  series.dataFields.categoryX = "label";
  series.name = "Nombre";
  series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
  series.columns.template.fillOpacity = 0.8;
  series.columns.template.stroke= am4core.color("#56bbd6");
  series.columns.template.fill= am4core.color("#56bbd6");

  let columnTemplate = series.columns.template;
  columnTemplate.strokeWidth = 2;
  columnTemplate.strokeOpacity = 1;

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
