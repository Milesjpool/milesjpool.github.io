import { ReactComponent as WthHash } from "icons/whatthehex/wth-hash.svg";
import "./WhatTheHex.css";
import { GooglePlayTag } from "app/Components/GooglePlayTag";
import { ReactComponent as KotlinGem } from "icons/whatthehex/kotlin_gem_color.svg";

export function WhatTheHex() {
  return (<div className="what-the-hex bg-white">
    <WthHash className="hash-icon" />
    <div className="description flex-col">
      <img className="logo" src="/assets/what-the-hex/logo.png" alt="What the Hex? logo" />

      <div className="description-text bg-white">
        <i>The colour guessing-game</i><br />
        <span className="emoji"> 🎨</span><br />
        Built as an exercise to learn <i>Kotlin</i>, and the <i>Google Play</i> development lifecycle.<br />
        <div className="flex-row icons">
          <a href="https://kotlinlang.org/" target="_blank" rel="noopener noreferrer">
            <KotlinGem className="icon" />
          </a>
          <a href="https://play.google.com/console" target="_blank" rel="noopener noreferrer">
            <img src="/assets/what-the-hex/play_gem_color.png" className="icon" alt="Google Play Console Icon" />
          </a>
        </div>
      </div>
    </div>

    <img className="mockup" src="/assets/what-the-hex/mockup.png" alt="screenshot mockup" />
    <GooglePlayTag />
  </div>)
}

