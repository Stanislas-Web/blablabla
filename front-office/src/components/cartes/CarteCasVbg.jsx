import React from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

class CarteCasVbg extends React.Component {
  mapRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      lng: 23.0542693,
      lat: -3.5139264,
      // limite : [
      //   [11.55893, -6.15680], // Southwest coordinates
      //   [32.28297, 4.822679395659658]   
      // ],
      zoom: 4.1,
      data: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://cartographievbg.herokuapp.com/api/vbg")
      .then((res) => {
        const { lng, lat, zoom,limite } = this.state;
        let { data } = this.state;
        const coord = res.data.map((element) => {
          return {
            type: "Feature",
            properties: {
              id: element._id,
            },
            geometry: {
              type: "Point",
              coordinates: element.province[0].geoJson[0].properties
                ? element.province[0].geoJson[0].properties.center.split(",")
                : [15.3125974, -4.3217055],
            },
          };
        });

        data = {
          type: "FeatureCollection",
          crs: {
            type: "name",
            properties: { name: "urn:ogc:def:crs:OGC:1.3:CRS84" },
          },
          features: [],
        };

        data["features"] = coord;
        // data = dataFormated;
        const map = new mapboxgl.Map({
          container: this.mapRef.current,
          // style: "mapbox://styles/mapbox/dark-v10",
          style: "mapbox://styles/mapbox/streets-v11",
          center: [lng, lat],
          zoom,
          maxBounds : limite,
        });

        map.on("load", function () {
          map.addSource("earthquakes", {
            type: "geojson",
            // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
            // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
            data: data,
            // data: "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",

            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
          });

          map.addLayer({
            id: "clusters",
            type: "circle",
            source: "earthquakes",
            filter: ["has", "point_count"],
            paint: {
              // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
              // with three steps to implement three types of circles:
              //   * Blue, 20px circles when point count is less than 100
              //   * Yellow, 30px circles when point count is between 100 and 750
              //   * Pink, 40px circles when point count is greater than or equal to 750
              "circle-color": [
                "step",
                ["get", "point_count"],
                "#51bbd6",
                100,
                "#f1f075",
                750,
                "#f28cb1",
              ],
              "circle-radius": [
                "step",
                ["get", "point_count"],
                20,
                100,
                30,
                750,
                40,
              ],
            },
          });

          map.addLayer({
            id: "cluster-count",
            type: "symbol",
            source: "earthquakes",
            filter: ["has", "point_count"],
            layout: {
              "text-field": "{point_count_abbreviated}",
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-size": 12,
            },
          });

          map.addLayer({
            id: "unclustered-point",
            type: "circle",
            source: "earthquakes",
            filter: ["!", ["has", "point_count"]],
            paint: {
              "circle-color": "#11b4da",
              "circle-radius": 4,
              "circle-stroke-width": 1,
              "circle-stroke-color": "#fff",
            },
          });

          // Add geolocate control to the map.
          map.addControl(
            new mapboxgl.GeolocateControl({
              positionOptions: {
                enableHighAccuracy: true,
              },
              trackUserLocation: true,
            })
          );

          // inspect a cluster on click
          // map.on("click", "clusters", function (e) {
          //   var features = map.queryRenderedFeatures(e.point, {
          //     layers: ["clusters"],
          //   });
          //   var clusterId = features[0].properties.cluster_id;
          //   map
          //     .getSource("earthquakes")
          //     .getClusterExpansionZoom(clusterId, function (err, zoom) {
          //       if (err) return;

          //       map.easeTo({
          //         center: features[0].geometry.coordinates,
          //         zoom: zoom,
          //       });
          //     });
          // });

          // HOVER-------------------------------------------------------*

          // const dataHover = {
          //   type: "FeatureCollection",
          //   features: [],
          // }
          // for (const element of res.data) {
          //   dataHover.features.push(element.province[0].geoJson[0])
          // }

          // let hoveredStateId = null;
          // map.addSource('states', {
          //   'type': 'geojson',
          //   'data':
          //   // 'https://docs.mapbox.com/mapbox-gl-js/assets/us_states.geojson'
          //   dataHover
          //   });

          //   // The feature-state dependent fill-opacity expression will render the hover effect
          //   // when a feature's hover state is set to true.
          //   map.addLayer({
          //   'id': 'state-fills',
          //   'type': 'fill',
          //   'source': 'states',
          //   'layout': {},
          //   'paint': {
          //   'fill-color': '#627BC1',
          //   'fill-opacity': [
          //   'case',
          //   ['boolean', ['feature-state', 'hover'], false],
          //   1,
          //   0.5
          //   ]
          //   }
          //   });

          //   map.addLayer({
          //   'id': 'state-borders',
          //   'type': 'line',
          //   'source': 'states',
          //   'layout': {},
          //   'paint': {
          //   'line-color': '#627BC1',
          //   'line-width': 2
          //   }
          //   });

          //   // When the user moves their mouse over the state-fill layer, we'll update the
          //   // feature state for the feature under the mouse.
          //   map.on('mousemove', 'state-fills', function(e) {
          //   if (e.features.length > 0) {
          //   if (hoveredStateId) {
          //   map.setFeatureState(
          //   { source: 'states', id: hoveredStateId },
          //   { hover: false }
          //   );
          //   }
          //   hoveredStateId = e.features[0].properties.id;
          //   map.setFeatureState(
          //   { source: 'states', id: hoveredStateId },
          //   { hover: true }
          //   );
          //   }
          //   });

          //   // When the mouse leaves the state-fill layer, update the feature state of the
          //   // previously hovered feature.
          //   map.on('mouseleave', 'state-fills', function() {
          //   if (hoveredStateId) {
          //   map.setFeatureState(
          //   { source: 'states', id: hoveredStateId },
          //   { hover: false }
          //   );
          //   }
          //   hoveredStateId = null;
          //   });
        });
      })
      .catch((erreur) => console.log(erreur));
  }

  render() {
    return (
      <div className="card">
        <div ref={this.mapRef} className="mapContainer" />
      </div>
    );
  }
}

export default CarteCasVbg;
// ReactDOM.render(<CarteCasVbg />, document.getElementById('app'));
