import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { Footer, Header } from "./components/HeaderFooter";
import TurnoutMap from "./components/Map";
import { VoterCalculatorSimple } from "./components/VoterCalculator";

import "./styles/app.scss";

const byline = JSON.parse(process.env.REACT_APP_AUTHOR);

export const App = () => {
  return (
    <HelmetProvider>
      <article>
        <Header />
        <div>
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
              TKTKTK beat TKTKTK in the Nov. 8 election — but with TKTKTK
              enthusiasm from voters than TKTKTK in the 2018 Gubernatorial race.
              The results showed TKTKTK garnered TK% of the vote statewide,
              compared to TKTKTK.
            </p>
            <p className="copy">
              The final results also offer a district-by-district snapshot of
              how New Yorkers turned out to vote during this election. Despite
              the election results, turnout has changed TKTKTK.
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
              If TKTKTK stayed home in large enough numbers — for example, if
              TKTKTK stay home — TKTKTK would have won the election. See for
              yourself below:
            </p>
            <br />
            <VoterCalculatorSimple />
          </div>
        </div>
        <Footer />
      </article>
    </HelmetProvider>
  );
};
