export const Attribution = () => (
  <div className="maplibregl-ctrl-bottom-left mapboxgl-ctrl-bottom-left">
    <details
      className="maplibregl-ctrl maplibregl-ctrl-attrib mapboxgl-ctrl mapboxgl-ctrl-attrib maplibregl-compact mapboxgl-compact maplibregl-compact-show mapboxgl-compact-show"
      open=""
    >
      <summary
        className="maplibregl-ctrl-attrib-button mapboxgl-ctrl-attrib-button"
        title="Toggle attribution"
        aria-label="Toggle attribution"
      ></summary>
      <div className="maplibregl-ctrl-attrib-inner mapboxgl-ctrl-attrib-inner">
        ©{" "}
        <a
          href="https://carto.com/about-carto/"
          target="_blank"
          rel="noopener noreferrer"
        >
          CARTO
        </a>
        , ©{" "}
        <a
          href="http://www.openstreetmap.org/about/"
          target="_blank"
          rel="noopener noreferrer"
        >
          OpenStreetMap
        </a>{" "}
        contributors
      </div>
    </details>
  </div>
);
