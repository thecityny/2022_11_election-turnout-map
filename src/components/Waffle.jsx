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
      label: "Cuomo Votes in NYC",
      value: 1705310,
      color: BLUE_COLOR,
    },
    {
      id: "upstate",
      label: "Cuomo Votes Upstate",
      value: 1930030,
      color: LIGHT_BLUE_COLOR,
    },
  ],
  Dem2022: [
    {
      id: "nyc",
      label: "Hochul Votes in NYC",
      value: 1405310,
      color: BLUE_COLOR,
    },
    {
      id: "upstate",
      label: "Hochul Votes Upstate",
      value: 1230030,
      color: LIGHT_BLUE_COLOR,
    },
  ],
  Rep2018: [
    {
      id: "nyc",
      label: "Molinaro Votes in NYC",
      value: 318000,
      color: RED_COLOR,
    },
    {
      id: "upstate",
      label: "Molinaro Votes Upstate",
      value: 1889602,
      color: LIGHT_RED_COLOR,
    },
  ],
  Rep2022: [
    {
      id: "nyc",
      label: "Zeldin Votes in NYC",
      value: 338000,
      color: RED_COLOR,
    },
    {
      id: "upstate",
      label: "Zeldin Votes Upstate",
      value: 1989602,
      color: LIGHT_RED_COLOR,
    },
  ],
};

const WaffleColumn = ({ columnData, electionYear }) => (
  <div className="waffle-chart-container">
    <ResponsiveWaffle
      data={columnData}
      total={4000000}
      rows={20}
      columns={4}
      colors={[columnData[0].color, columnData[1].color]}
      emptyColor={BACKGROUND_COLOR}
    />
    <div>{electionYear}</div>
  </div>
);

export const WaffleChart = () => (
  <div className="waffle-chart-section">
    <WaffleColumn columnData={WaffleChartData.Dem2018} electionYear="2018" />
    <WaffleColumn columnData={WaffleChartData.Dem2022} electionYear="2022" />
    <WaffleColumn columnData={WaffleChartData.Rep2018} electionYear="2018" />
    <WaffleColumn columnData={WaffleChartData.Rep2022} electionYear="2022" />
  </div>
);
