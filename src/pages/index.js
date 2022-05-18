import axios from "axios"
import React, { useState, useEffect } from "react"
import {
  container,
  appbody,
  appheading,
  appinfoblock,
  subVal,
  appdeploy,
  area,
  circles,
  btn,
  listCircles,
  h1,
  h4,
  appheader
} from "./layout.module.css"

export default function Home() {
  const [ip, setIP] = useState("?")
  const [city, setCity] = useState("?")
  const [country, setCountry] = useState("?")
  const [host, setHost] = useState("")
  const [Latency, setLatency] = useState("?")

   const getlatency=()=>{
    var started=new Date().getTime();
    var url="https://ipinfo.io/json?t=" + (+new Date());
    fetch(url).then(function(response){
      var ended=new Date().getTime();
      var milliseconds=ended - started;
      setLatency(milliseconds);
    }).catch(function(error){
      setLatency("?")
    })
  }

  const getData = async () => {
    const hname = window.location.hostname
    setHost(hname)
    setInterval(getlatency,1000)
    const res = await axios.get("https://ipinfo.io/json")
    setCity(res.data.city);
    setCountry(res.data.country);
    setIP(res.data.ip);
    
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <main className={container}>
      <title>Elestio Staic Page</title>
      <div className={appheader}>
        <img src="src/images/elestio-logo.svg"  alt="logo"/>
    </div>
      <div className={appbody}>
        <div className={appheading}>
          <h1 className={h1}>Welcome to Elestio</h1>
          <h4 className={h4}>
            Deploy your apps quickly with the easiest CI/CD system
          </h4>
        </div>

        <p className={appinfoblock}>
          This Host <strong className={subVal}>{host}</strong>
        </p>

        <p className={appinfoblock}>
          Your IP <strong className={subVal}>{ip}</strong>
        </p>

        <p className={appinfoblock}>
          Your Location
          <strong className={subVal}>
            {country},{city}
          </strong>
        </p>

        <p className={appinfoblock}>
          Latency to server <strong className={subVal}>{Latency} ms</strong>
        </p>

        <div className={appdeploy}>
          <a
            href="https://dash.elest.io/deploy?source=cicd&social=Github&url=https://github.com/elestio-examples/static"
            className={btn}
          >
            Deploy on Elestio
          </a>
        </div>
      </div>

      <div className={area}>
        <ul className={circles}>
          <li className={listCircles}></li>
          <li className={listCircles}></li>
          <li className={listCircles}></li>
          <li className={listCircles}></li>
          <li className={listCircles}></li>
          <li className={listCircles}></li>
          <li className={listCircles}></li>
          <li className={listCircles}></li>
          <li className={listCircles}></li>
          <li className={listCircles}></li>
        </ul>
      </div>
    </main>
  )
}
