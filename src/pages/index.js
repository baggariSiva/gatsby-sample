import axios from "axios";
import React, { useState, useEffect } from "react";
import "../components/style.scss";
import elestio from "../images/elestio-logo.svg";

export default function Home() {
  const [ip, setIP] = useState("?");
  const [Latency, setLatency] = useState("?");

  const getData = async () => {
    try {
       const res = await axios.get("https://ipwhois.app/json/");
       setIP(res.data);
    } catch (ex) {}
  };

  useEffect(() => {
    setInterval(() => {
      var started = new Date().getTime();
      var url = "/data.json";
      fetch(url)
        .then(function (response) {
          var ended = new Date().getTime();
          var milliseconds = ended - started;
          setLatency(milliseconds);
        })
        .catch(function (error) {
          setLatency("?");
        });
    }, 1000);
    getData();
  }, []);

  return (
    <main>
      <title>Elestio Gatsby Example</title>
      <img
        src={elestio}
        alt="Elestio logo"
        style={{ height: `60px`, margin: `20px` }}
      />
      <div className="container">
        <div className="app-body">
          <div className="app-heading">
            <h1>Welcome to Elestio - Gatsby</h1>
            <h4>Deploy your apps quickly with the easiest CI/CD system</h4>
          </div>

          <p className="app-info-block">
            This Host <strong className="subVal">{window.location.host}</strong>
          </p>
          {ip.ip && (
            <React.Fragment>
              <p className="app-info-block">
                Your IP <strong className="subVal">{ip.ip}</strong>
              </p>

              <p className="app-info-block">
                Your Location
                <strong className="subVal">
                  {ip.country},{ip.city}
                </strong>
              </p>
            </React.Fragment>
          )}

          <p className="app-info-block">
            Latency to server <strong className="subVal">{Latency} ms</strong>
          </p>

          <div className="app-deploy">
            <a
              href="https://dash.elest.io/deploy?source=cicd&social=Github&url=https://github.com/elestio-examples/static"
              className="btn"
            >
              Deploy on Elestio
            </a>
          </div>
        </div>

        <div className="area">
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </main>
  );
}
