import { ResponsiveWaffle } from "@nivo/waffle";

const RED_COLOR = "#d02d3c";
const BLUE_COLOR = "#214da5";
const LIGHT_RED_COLOR = "#e5c5c7";
const LIGHT_BLUE_COLOR = "#c2cbdc";

const BACKGROUND_COLOR = "#ebebeb";

const WaffleChartData = {
  Dem2018: [
    {
      id: "nyc",
      label: "NYC",
      value: 1705310,
      color: BLUE_COLOR,
    },
    {
      id: "upstate",
      label: "Upstate",
      value: 1930030,
      color: LIGHT_BLUE_COLOR,
    },
  ],
  Dem2022: [
    {
      id: "nyc",
      label: "NYC",
      value: 1405310,
      color: BLUE_COLOR,
    },
    {
      id: "upstate",
      label: "Upstate",
      value: 1230030,
      color: LIGHT_BLUE_COLOR,
    },
  ],
  Rep2018: [
    {
      id: "nyc",
      label: "NYC",
      value: 318000,
      color: RED_COLOR,
    },
    {
      id: "upstate",
      label: "Upstate",
      value: 1889602,
      color: LIGHT_RED_COLOR,
    },
  ],
  Rep2022: [
    {
      id: "nyc",
      label: "NYC",
      value: 338000,
      color: RED_COLOR,
    },
    {
      id: "upstate",
      label: "Upstate",
      value: 1989602,
      color: LIGHT_RED_COLOR,
    },
  ],
};

const WaffleColumn = ({ columnData, label }) => (
  <div className="waffle-chart-container">
    <ResponsiveWaffle
      data={columnData}
      total={4000000}
      rows={20}
      columns={4}
      colors={[columnData[0].color, columnData[1].color]}
      emptyColor={BACKGROUND_COLOR}
      tooltip={({ label, value }) => (
        <div>
          {label} <br />
          {value.toLocaleString()} votes
        </div>
      )}
    />
    {label}
  </div>
);

export const WaffleChart = () => (
  <div className="waffle-chart-section">
    <WaffleColumn
      columnData={WaffleChartData.Dem2018}
      label={
        <div className="waffle-chart-label">
          2018
          <br />
          Cuomo
        </div>
      }
    />
    <WaffleColumn
      columnData={WaffleChartData.Dem2022}
      label={
        <div className="waffle-chart-label">
          2022
          <br />
          Hochul
        </div>
      }
    />
    <WaffleColumn
      columnData={WaffleChartData.Rep2018}
      label={
        <div className="waffle-chart-label">
          2018
          <br />
          Molinaro
        </div>
      }
    />
    <WaffleColumn
      columnData={WaffleChartData.Rep2022}
      label={
        <div className="waffle-chart-label">
          2022
          <br />
          Zeldin
        </div>
      }
    />
  </div>
);
