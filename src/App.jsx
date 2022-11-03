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

          <div className="container">
            <p className="copy">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
              pellentesque luctus magna sed auctor. Cras ullamcorper urna mattis
              lectus sagittis, quis vehicula dui vestibulum.
            </p>
            <p className="copy">
              Aliquam sollicitudin libero vel diam cursus, ut egestas ex
              scelerisque. Nullam vestibulum metus interdum, dictum erat vel,
              luctus elit. Nullam aliquam ante elit, mollis aliquet nulla
              efficitur molestie. Praesent a tempus mi.
            </p>
          </div>

          <br />

          <TurnoutMap />
        </div>
        <Footer />
      </article>
    </HelmetProvider>
  );
};
