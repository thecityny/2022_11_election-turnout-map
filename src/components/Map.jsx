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
import { MapPopup } from "./Popup";

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
    "fill-outline-color": "#eeeeee",
  },
};

const hoverStyle = {
  id: "eds-highlighted",
  type: "line",
  source: "eds",
  paint: {
    "line-width": 1.5,
    "line-color": "#000",
  },
};

const TurnoutMap = () => {
  const [allData, setAllData] = React.useState(null);
  const [hoverInfo, setHoverInfo] = React.useState(null);

  React.useEffect(() => {
    fetch("./data/eds.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((json) => setAllData(feature(json, json.objects.eds)))
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  }, []);

  const onHover = React.useCallback((event) => {
    const district = event.features && event.features[0];
    setHoverInfo({
      longitude: event.lngLat.lng,
      latitude: event.lngLat.lat,
      districtData: !!district ? district.properties : null,
    });
  }, []);

  const selectedDistrict =
    (hoverInfo && hoverInfo.districtData && hoverInfo.districtData.ed) || "";

  const filter = React.useMemo(
    () => ["in", "ed", selectedDistrict],
    [selectedDistrict]
  );

  const onMouseLeave = React.useCallback(() => setHoverInfo(null), []);

  return (
    <Map
      mapLib={maplibregl}
      initialViewState={{
        longitude: -73.977708344928,
        latitude: 40.713323256573386,
        zoom: 9.5,
      }}
      style={{ width: "100%", height: 600 }}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json"
      onMouseMove={onHover}
      interactiveLayerIds={allData ? ["eds"] : []}
      scrollZoom={false}
      dragRotate={false}
      onMouseLeave={onMouseLeave}
      minZoom={9}
      maxZoom={18}
    >
      {allData && (
        <>
          <Source id="election-margins-data" type="geojson" data={allData}>
            <Layer {...layerStyle} />
            <Layer {...hoverStyle} filter={filter} />
          </Source>

          {hoverInfo && hoverInfo.districtData && (
            <MapPopup hoverInfo={hoverInfo} />
          )}
        </>
      )}
      <GeolocateControl />
      <FullscreenControl />
      <NavigationControl showCompass={false} />
    </Map>
  );
};

export default TurnoutMap;
