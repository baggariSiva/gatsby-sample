import axios from "axios";
import React, { useState, useEffect } from "react";
import Image from "../components/image";
import "../components/style.scss";

export default function Home() {
  const [ip, setIP] = useState("?");
  const [city, setCity] = useState("?");
  const [country, setCountry] = useState("?");
  const [host, setHost] = useState("");
  const [Latency, setLatency] = useState("?");

  const getlatency = () => {
    var started = new Date().getTime();
    var url = "https://ipwhois.app/json/";
    fetch(url)
      .then(function (response) {
        var ended = new Date().getTime();
        var milliseconds = ended - started;
        setLatency(milliseconds);
      })
      .catch(function (error) {
        setLatency("?");
      });
  };

  const getData = async () => {
    const hname = window.location.hostname;
    setHost(hname);
    setInterval(getlatency, 1000);
    const res = await axios.get("https://ipwhois.app/json/");
    setCity(res.data.city);
    setCountry(res.data.country);
    setIP(res.data.ip);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main>
      <title>Elestio Staic Example</title>
      <Image
        src="elestio-logo.svg"
        alt="logo"
        style={{ height: "40px", margin: "20px" }}
      />
      <div className="container">
        <div className="app-body">
          <div className="app-heading">
            <h1>Welcome to Elestio</h1>
            <h4>Deploy your apps quickly with the easiest CI/CD system</h4>
          </div>

          <p className="app-info-block">
            This Host <strong className="subVal">{host}</strong>
          </p>

          <p className="app-info-block">
            Your IP <strong className="subVal">{ip}</strong>
          </p>

          <p className="app-info-block">
            Your Location
            <strong className="subVal">
              {country},{city}
            </strong>
          </p>

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
