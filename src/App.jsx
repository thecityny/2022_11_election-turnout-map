import React from "react";
import { HelmetProvider } from "react-helmet-async";
import {
  CountyTurnoutMap,
  HistoricalTurnoutChart,
} from "./components/DataWrapper";
import { Footer, Header } from "./components/HeaderFooter";
import TurnoutMap from "./components/Map";
import { WaffleChart } from "./components/Waffle";

import "./styles/app.scss";

const byline = JSON.parse(process.env.REACT_APP_AUTHOR);

export const App = () => {
  return (
    <HelmetProvider>
      <article>
        <Header />
        <div className="app">
          <div className="container">
            <h1 className="headline">{process.env.REACT_APP_SITE_NAME}</h1>
            <div className="attribution">
              <p className="byline">
                By{" "}
                {byline.map((author, i) => (
                  <span key={i} className="author">
                    <a href={author.url}>{author.name}</a>
                    {i < byline.length - 2
                      ? ", "
                      : i < byline.length - 1
                      ? " and "
                      : ""}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <br />

          <div className="copy-container">
            <p className="copy">
              In a close contest for governor, the results were shaped by voter
              turnout — how many registered voters actually decided to show up
              at the polls or cast an absentee ballot.
            </p>
            <p className="copy">
              This map shows the percent of active registered voters in each New
              York City election district who cast a ballot for governor,
              including absentee ballots counted by the city Board of Elections
              to date.
            </p>
          </div>

          <br />
          <div className="copy-container">
            <TurnoutMap />
          </div>
          <br />

          <div className="copy-container">
            <br />
            <p className="copy">
              Click to select “Who won” and it will show which candidates for
              governor and lieutenant governor — Kathy Hochul/Antonio Delgado or
              Lee Zeldin/Alison Esposito — secured the most votes in each
              election district in New York City.
            </p>
            <br />
            <p className="copy">
              Voter turnout so far is [higher/lower] than in the final count for
              the last election for governor in 2018, with New York City
              accounting for a [smaller/larger] share of the state’s votes. Some
              absentee ballots remain outstanding.
            </p>
            <br />
            <WaffleChart />
            <br />
            <p className="copy">
              TKTKTK Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <br />
            <CountyTurnoutMap />
            <br />
            <br />
            <p className="copy">
              TKTKTK Duis aute irure dolor in reprehenderit in voluptate velit
              esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
              occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </p>
            <br />
            <HistoricalTurnoutChart />
          </div>
        </div>
        <Footer />
      </article>
    </HelmetProvider>
  );
};
