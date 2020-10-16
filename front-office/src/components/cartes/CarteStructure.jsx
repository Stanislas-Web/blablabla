import React, { useState, useEffect } from "react";
import API from "../../services/api/api";
import {formatStructure} from "../../services/helpers/api.helper"
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import DetailStructure from 'containers/ContainerDetailStructure';
import CardDetailStructure from 'components/CardDetailStructure'


export default function CarteStructure() {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";
  const [mapRef, setMapRef] = useState(React.createRef());
  const [dataStructure, setDataStructure] = useState([]);
  const [displayDetailStructure,setDisplayDetailStructure] =  useState(false);
  const [selectStructure, setSelectStructure] = useState({
    nom : '',
    description :''
  });
  const [visibility,setVisibility] = useState(false)
  useEffect(() => {
    API.get("acteurStructure")
      .then((res) => {
        setDataStructure(formatStructure(res.data));
        createMap(mapRef, formatStructure(res.data));
      })
      .catch((erreur) => console.log(erreur));
  }, []);

  function createMap(mapRef, data) {
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [23.0542693, -3.5139264],
      zoom: 4,
    });
    const customData = formatDataStructure(data);

    function forwardGeocoder(query) {
      let matchingFeatures = [];
      for (let i = 0; i < customData.features.length; i++) {
        let feature = customData.features[i];
        // handle queries with different capitalization than the source data by calling toLowerCase()
        if (
          feature.properties.nom.toLowerCase().search(query.toLowerCase()) !==
          -1
        ) {
          // add a tree emoji as a prefix for custom data results
          // using carmen geojson format: https://github.com/mapbox/carmen/blob/master/carmen-geojson.md
          feature["place_name"] = feature.properties.nom;
          feature["center"] = feature.geometry.coordinates;
          feature["place_type"] = ["park"];
          matchingFeatures.push(feature);
        }
      }
      return matchingFeatures;
    }

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        countries: "CD",
        localGeocoder: forwardGeocoder,
        zoom: 14,
        placeholder: "Rechercher une structure",
        mapboxgl: mapboxgl,
        render : function(item){
          return "<div>"+item.properties.nom+"</div>"
        }
      })
    );

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    map.on("load", function () {
      map.addSource("structures", formatGeoJson(data));
      // Add a layer showing the places.
      map.addLayer({
        id: "structures",
        type: "symbol",
        source: "structures",
        layout: {
          "icon-image": "town-hall-15",
          "icon-allow-overlap": true,
        },
      });
    });

    // When a click event occurs on a feature in the places layer, open a popup at the
    // location of the feature, with description HTML from its properties.
    map.on("click", "structures", function (e) {
      setSelectStructure(e.features[0].properties)
      setDisplayDetailStructure(true)
      localStorage.setItem("visible","1")
    });
    
    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on("mouseenter", "places", function () {
      map.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    map.on("mouseleave", "places", function () {
      map.getCanvas().style.cursor = "";
    });
  }

  function formatDataStructure(data) {
    const dataFormated = {
      features: [],
    };
    for (const element of data) {
      dataFormated.features.push({
        type: "Feature",
        properties: element,
        geometry: {
          coordinates: [element.longitude, element.latitude],
          type: "Point",
        },
      });
    }

    return dataFormated;
  }
  function formatGeoJson(data) {
    return {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: formatDataStructure(data)['features'],
      },
    };
  }



  return (
    <div className="">
      <div
        ref={mapRef}
        className="mapStructureContainer "
        style={{ height: "500px" }}
      ></div>
    {/* <DetailStructure/> */}
    {displayDetailStructure ? <CardDetailStructure structure= {selectStructure} visible={displayDetailStructure} /> : ""}
    {/* <CardDetailStructure structure = {selectStructure} display={false}/> */}
    </div>
  );
}
