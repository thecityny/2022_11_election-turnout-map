import { Popup } from "react-map-gl";

export const MapPopup = ({ hoverInfo }) => {
  const { latitude, longitude, districtData } = hoverInfo;
  const totalVotes = districtData.dem + districtData.rep + districtData.other;
  return (
    <Popup
      longitude={longitude}
      latitude={latitude}
      closeButton={false}
      className="county-info"
    >
      <div className="popup-content">
        <div className="report">
          <h3>Election District {districtData.ed}</h3>
          <table className="results">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Party</th>
                <th className="number">Votes</th>
                <th className="number">Pct.</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Kathy Hochul</td>
                <td>DEM</td>
                <td className="number">{districtData.dem}</td>
                <td className="number">
                  {totalVotes !== 0
                    ? (districtData.dem / totalVotes).toLocaleString("en-US", {
                        style: "percent",
                        maximumFractionDigits: 1,
                        minimumFractionDigits: 1,
                      })
                    : "0%"}
                </td>
              </tr>
              <tr>
                <td>Lee Zeldin</td>
                <td>REP</td>
                <td className="number">{districtData.rep}</td>
                <td className="number">
                  {totalVotes !== 0
                    ? (districtData.rep / totalVotes).toLocaleString("en-US", {
                        style: "percent",
                        maximumFractionDigits: 1,
                        minimumFractionDigits: 1,
                      })
                    : "0%"}
                </td>
              </tr>
              <tr>
                <td>Other</td>
                <td></td>
                <td className="number">{districtData.other}</td>
                <td className="number">
                  {totalVotes !== 0
                    ? (districtData.other / totalVotes).toLocaleString(
                        "en-US",
                        {
                          style: "percent",
                          maximumFractionDigits: 1,
                          minimumFractionDigits: 1,
                        }
                      )
                    : "0%"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Popup>
  );
};
