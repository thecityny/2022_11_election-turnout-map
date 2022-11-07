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

import { MapPopup } from "./Popup";

import "maplibre-gl/dist/maplibre-gl.css";
import SearchBar from "./SearchBar";
import { Legend } from "./Legend";
import {
  CircularProgress,
  FormControlLabel,
  FormGroup,
  Switch,
} from "@mui/material";
import { Attribution } from "./Attribution";

/**
 * This is a public access token connected to THE CITY's MapBox account:
 */
const MAPBOX_TOKEN =
  "pk.eyJ1IjoidGhlLWNpdHkiLCJhIjoiY2xhMWVuaDNqMDZ1ZzNxbzNkM3poMHBheSJ9.SJAnL4rHAR6jShHQniZZHg";

const getLayerStyle = (isTurnoutMap) => {
  const breaks = isTurnoutMap
    ? [-32, -28, -24, -20, -16, -12, -8, -4, 0]
    : [-100, -50, 0, 50, 100];
  const mixedColorScheme = isTurnoutMap
    ? [
        "#ffffff",
        "#f0f0f0",
        "#d9d9d9",
        "#bdbdbd",
        "#969696",
        "#737373",
        "#525252",
        "#252525",
        "#0a0a0a",
      ]
    : ["#d02d3c", "#e99498", "#f7f7f7", "#91a5d3", "#214da5"];
  const mixedColors = mixedColorScheme.map((v, i, a) => [breaks[i], v]);
  return {
    id: "eds",
    type: "fill",
    paint: {
      "fill-color": isTurnoutMap
        ? [
            "case",
            ["to-boolean", ["coalesce", ["get", "t22"], ["get", "t18"]]],
            [
              "interpolate",
              ["linear"],
              ["to-number", ["-", ["get", "t22"], ["get", "t18"]]],
            ].concat(...mixedColors),
            "#0a0a0a",
          ]
        : [
            "case",
            ["to-boolean", ["get", "margin"]],
            [
              "interpolate",
              ["linear"],
              ["to-number", ["get", "margin"]],
            ].concat(...mixedColors),
            "#ccc",
          ],
      "fill-opacity": 0.75,
      "fill-outline-color": isTurnoutMap ? "#333" : "#eee",
    },
  };
};

const getHoverStyle = (isTurnoutMap) => ({
  id: "eds-highlighted",
  type: "line",
  source: "eds",
  paint: {
    "line-width": 1.5,
    "line-color": isTurnoutMap ? "#fcc32c" : "#000",
  },
});

const TurnoutMap = () => {
  /**
   * Which map type are we showing? Margins map or voter turnout map?
   */
  const [isTurnoutMap, setIsTurnoutMap] = React.useState(true);
  const [mapData, setMapData] = React.useState(null);
  const [hoverInfo, setHoverInfo] = React.useState(null);

  React.useEffect(() => {
    fetch("./data/eds.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((json) => {
        setMapData(feature(json, json.objects.eds));
        console.log("Election data loaded");
      })
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

  return !!mapData ? (
    <Map
      mapLib={maplibregl}
      initialViewState={{
        longitude: -73.977708344928,
        latitude: 40.713323256573386,
        zoom: 9.3,
      }}
      style={{ width: "100%", height: 600 }}
      mapStyle={`https://basemaps.cartocdn.com/gl/${
        isTurnoutMap ? "dark-matter" : "positron"
      }-nolabels-gl-style/style.json`}
      onMouseMove={onHover}
      interactiveLayerIds={["eds"]}
      scrollZoom={false}
      dragRotate={false}
      onMouseLeave={onMouseLeave}
      minZoom={9}
      maxZoom={18}
      mapboxAccessToken={MAPBOX_TOKEN}
      attributionControl={false}
    >
      <Source id="election-margins-data" type="geojson" data={mapData}>
        <Layer {...getLayerStyle(isTurnoutMap)} />
        <Layer {...getHoverStyle(isTurnoutMap)} filter={filter} />
      </Source>

      {hoverInfo && hoverInfo.districtData && (
        <MapPopup hoverInfo={hoverInfo} isTurnoutMap={isTurnoutMap} />
      )}

      {/* MuiFormControlLabel */}
      <FormGroup
        className={
          isTurnoutMap ? "turnout-map-selected" : "margins-map-selected"
        }
      >
        <span>Margins</span>
        <FormControlLabel
          control={
            <Switch
              checked={isTurnoutMap}
              onChange={() => setIsTurnoutMap(!isTurnoutMap)}
              color="default"
            />
          }
          label="Turnout"
        />
      </FormGroup>

      <GeolocateControl />
      <FullscreenControl />
      <NavigationControl showCompass={false} />
      <SearchBar mapboxAccessToken={MAPBOX_TOKEN} position="top-left" />
      <Attribution />

      <Legend isTurnoutMap={isTurnoutMap} />
    </Map>
  ) : (
    <div className="loading-screen">
      <div>
        <CircularProgress color="inherit" />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default TurnoutMap;
