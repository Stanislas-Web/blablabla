import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {formatDataForAmChartPie} from "../../services/helpers/amChart.helper"

am4core.useTheme(am4themes_animated);

class AmchartPie extends Component {
  componentDidMount() {
    const { data, tagName } = this.props;
    let formatedData = [];
    // Create chart instance
    data.then((d)=> {
      let chart = am4core.create(tagName, am4charts.PieChart);
      chart.data = formatDataForAmChartPie(d)
       // Add and configure Series
      var pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "nombre";
      pieSeries.dataFields.category = "label";
      pieSeries.slices.template.stroke = am4core.color("#fff");
      pieSeries.slices.template.strokeOpacity = 1;

      // This creates initial animation
      pieSeries.hiddenState.properties.opacity = 1;
      pieSeries.hiddenState.properties.endAngle = -90;
      pieSeries.hiddenState.properties.startAngle = -90;

      chart.hiddenState.properties.radius = am4core.percent(0);
      // label
      pieSeries.ticks.template.disabled = true;
      pieSeries.labels.template.disabled = true;
      // legend
      chart.legend = new am4charts.Legend();
      chart.legend.position = "right";

      this.chart = chart;
      });

  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return (
      <div id={this.props.tagName} style={{ width: "100%", height: "300px" }}></div>
    );
  }
}

export default AmchartPie;
