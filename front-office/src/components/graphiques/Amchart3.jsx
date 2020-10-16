import React, {Component} from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from "axios";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Création chart instance
class Amcharts3 extends Component {
  componentDidMount() {
    axios.get("https://cartographievbg.herokuapp.com/api/vbgAamchart")
    .then((res)=>{
      
/**
 * ici il s'agit de faire une boucle pour recuperer les provinces en fin de le mettre dans le graphique
 */
        // const filtreprovincce=res.data.province.map((response)=>{
        //   for(const i=0;i<response.properties.name.length;i++){
        //     return response.properties.name[i];
        //   }
        // })
        // console.log(filtreprovincce)
/**
 * faire egalement une boucle en s'inspirant de la province pour recuperer 
 * le total de  ce chaque type de violance sexuelle par province type de violance (confere la methode filter)
 *
 */
const filtreTypeviolance=res.data.type_violence.filter((elements)=>{
  const alltype=res.data.type_violence.map((type)=>{ 
      return type.type_violence
  })
  for(let i=0;i<alltype.length;i++){
    console.log(alltype[i]);
    return elements.type_violence==alltype[i]
  }
})
console.log(filtreTypeviolance.length);


 /**
  * le premier graphique ce le fichiier Amchart3
  * et le deuxième graphique ce le fichier amchart2
  */
 /**
  * j'ai dejà filtrer pour toi les toi à partir du serveur tout ce que t'as à 
  * faire ce de recuperer les differents tableaux que j'ai filtrer
  */

        let chart = am4core.create("chartdiveAmchart3", am4charts.XYChart);
        chart.data=[res.data]

          // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "province";
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 30;
    categoryAxis.renderer.labels.template.adapter.add("dy", function(dy, target) {
      if (target.dataItem && target.dataItem.index & 2 == 2) {
        return dy + 25;
      }
      return dy;
    });
    
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    
    // Create series
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = "nombresdescas";
    series.dataFields.categoryX = "province";
    series.name = "nombresdescas";
    series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
    series.columns.template.fillOpacity = .8;
    
    let columnTemplate = series.columns.template;
    columnTemplate.strokeWidth = 2;
    columnTemplate.strokeOpacity = 1;
        

    }).catch((err)=>{
      console.log(err)
    })
   

    // chart.data = [{

    // "province": "Nord-kivu",
    //   "nombresdescas": 501.9
    // }, {
    //   "province": "Sud-kivu",
    //   "nombresdescas": 301.9
    // }, {
    //   "province": "Kananga",
    //   "nombresdescas": 201.1
    // }, {
    //   "province": "Kinshasa",
    //   "nombresdescas": 165.8
    // }, {
    //   "province": "Sud-ubangi",
    //   "nombresdescas": 139.9
    // }, {
    //   "province": "Equateur",
    //   "nombresdescas": 128.3
    // }, {
    //   "province": "Congo central",
    //   "nombresdescas": 99
    // },
    // {
    //   "province": "Maniema",
    //   "nombresdescas": 90
    // }, {
    //   "province": "Katanga",
    //   "nombresdescas": 60
    // }, {
    //   "province": "Bas ndundu",
    //   "nombresdescas": 50
    // }];
    
  

    

  }


  render() { 
    return (  
      <div id="chartdiveAmchart3" style={{ width: "100%", height: "500px" }}>

      </div>
    );
  }
}

 
export default Amcharts3;