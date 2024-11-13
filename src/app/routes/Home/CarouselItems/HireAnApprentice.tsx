import { ReactComponent as SpringerGem } from "icons/springer_gem.svg";

import "./HireAnApprentice.css";

export function HireAnApprentice() {
  return (
    <div className="springer-cover">
      <div className="khaki" />
      <div className="orange author-text">
        Paul Shannon <br />
        Miles Pool (2016)
      </div>
      <div className="white spine-text">
        <a href="https://www.springer.com/series/7911" target="_blank" rel="noopener noreferrer">
          LNBIP 251
        </a>
      </div>
      <div className="orange title-text">
        <a href="https://link.springer.com/chapter/10.1007/978-3-319-33515-5_23" target="_blank" rel="noopener noreferrer">
          Hire an Apprentice: Evolutionary Learning at the 7digital Technical Academy
        </a>
      </div>
      <div className="orange" />
      <div className="white citation-text">
        <a href="https://link.springer.com/book/10.1007/978-3-319-33515-5" target="_blank" rel="noopener noreferrer">
          In: Sharp, H., Hall, T. (eds) Agile Processes, in Software Engineering, and Extreme Programming. XP 2016.<br />
        </a>
      </div>
      <div className="orange" />
      <div className="khaki publisher-text">
        <a href="https://www.springeropen.com/" target="_blank" rel="noopener noreferrer" >
          <SpringerGem className="icon" fill="white" />
          Springer <span className="sans-serif">Open</span>
        </a>
      </div>
    </div>
  )
}