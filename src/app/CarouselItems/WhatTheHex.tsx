import { ReactComponent as WthHash } from "icons/whatthehex/wth-hash.svg";
import "./WhatTheHex.css";

export function WhatTheHex() {
  return (<div className="what-the-hex">
    <WthHash className="hash-icon"/>
    <div className="description">
      <img className="logo" src="/what-the-hex/logo.png" alt="What the Hex? logo" />

      <div className="description-text">
        <hr/>
        A simple colour guessing-game.<br/>
        Built as an excercise to learn Kotlin, and the Google Play development lifecycle.<br/>
        <br/>
        🎨
      </div>
    </div>
    
    <img className="mockup" src="/what-the-hex/mockup.png" alt="screenshot mockup" />
    <a href="https://play.google.com/store/apps/details?id=com.milesjpool.whatthehex"> 
        <img className="play-badge" src="/google-play-badge.png" alt="Google Play badge" />
    </a>
  </div>)
}