import React, { Component } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import {formatDataForAmChartPie} from "../../services/helpers/amChart.helper"

am4core.useTheme(am4themes_animated);

class AmchartBar extends Component {
  componentDidMount() {
    const { data, tagName } = this.props;
    data.then((d)=> {
      
      // Create chart instance
      let chart = am4core.create(tagName, am4charts.XYChart);
      chart.data = formatDataForAmChartPie(d)
      // Add data

     // Create axes

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "label";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 30;

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

      // Create series
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "nombre";
      series.dataFields.categoryX = "label";
      series.name = "Nombre";
      series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
      series.columns.template.fillOpacity = 0.8;

      let columnTemplate = series.columns.template;
      columnTemplate.strokeWidth = 2;
      columnTemplate.strokeOpacity = 1;
      // tri
      categoryAxis.sortBySeries = series;
      this.chart = chart;

    });

    
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  render() {
    return <div id={this.props.tagName} style={{ width: "100%", height: "300px" }}></div>;
  }
}

export default AmchartBar;
