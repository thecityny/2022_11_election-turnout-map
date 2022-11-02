import * as React from "react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Layer,
  NavigationControl,
  Source,
} from "react-map-gl";
import maplibregl from "maplibre-gl";
import { feature } from "topojson-client";
import { schemeRdBu } from "d3-scale-chromatic";

import "maplibre-gl/dist/maplibre-gl.css";

const breaks = [-100, -50, 0, 50, 100];
const mixedColorScheme = schemeRdBu[breaks.length];
const mixedColors = mixedColorScheme.map((v, i, a) => [breaks[i], v]);

const layerStyle = {
  id: "eds",
  type: "fill",
  paint: {
    "fill-color": [
      "case",
      ["to-boolean", ["get", "margin"]],
      ["interpolate", ["linear"], ["to-number", ["get", "margin"]]].concat(
        ...mixedColors
      ),
      "#ccc",
    ],
    "fill-opacity": 0.75,
  },
};

const TurnoutMap = () => {
  const [allData, setAllData] = React.useState(null);

  React.useEffect(() => {
    fetch("data/eds.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((json) => setAllData(feature(json, json.objects.eds)))
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  }, []);

  return (
    <Map
      mapLib={maplibregl}
      initialViewState={{
        longitude: -73.957708344928,
        latitude: 40.713323256573386,
        zoom: 9.7,
      }}
      style={{ width: "100%", height: 700 }}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json"
      scrollZoom={false}
      dragRotate={false}
      minZoom={9}
      maxZoom={18}
    >
      <Source id="election-margins-data" type="geojson" data={allData}>
        <Layer {...layerStyle} />
      </Source>

      <GeolocateControl />
      <FullscreenControl />
      <NavigationControl showCompass={false} />
    </Map>
  );
};

export default TurnoutMap;
