import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { Footer, Header } from "./components/HeaderFooter";
import TurnoutMap from "./components/Map";

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
              Voter turnout was a deciding factor in the 2022 New York
              governor’s race. Use this map to find out if your neighborhood
              showed up to vote. You can search for an address to see turnout
              relative to 2018 in your neighborhood.
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
          </div>
        </div>
        <Footer />
      </article>
    </HelmetProvider>
  );
};
