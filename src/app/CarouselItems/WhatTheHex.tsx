import { ReactComponent as WthHash } from "icons/whatthehex/wth-hash.svg";
import "./WhatTheHex.css";
import { GooglePlayTag } from "../Components/GooglePlayTag";

export function WhatTheHex() {
  return (<div className="what-the-hex">
    <WthHash className="hash-icon" />
    <div className="description flex-col">
      <img className="logo" src="/what-the-hex/logo.png" alt="What the Hex? logo" />

      <div className="description-text">
        <i>The colour guessing-game</i><br />
        <span className="emoji"> 🎨</span><br />
        Built as an excercise to learn <i>Kotlin</i>, and the <i>Google Play</i> development lifecycle.<br />
      </div>
    </div>

    <img className="mockup" src="/what-the-hex/mockup.png" alt="screenshot mockup" />
    <GooglePlayTag />
  </div>)
}

