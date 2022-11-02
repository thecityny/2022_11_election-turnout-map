import * as React from "react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  NavigationControl,
} from "react-map-gl";
import maplibregl from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";

const TurnoutMap = () => (
  <Map
    mapLib={maplibregl}
    initialViewState={{
      longitude: -73.957708344928,
      latitude: 40.693323256573386,
      zoom: 9,
    }}
    style={{ width: "100%", height: 700 }}
    mapStyle="https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json"
    scrollZoom={false}
    dragRotate={false}
    minZoom={9}
    maxZoom={18}
  >
    <GeolocateControl />
    <FullscreenControl />
    <NavigationControl showCompass={false} />
  </Map>
);

export default TurnoutMap;
