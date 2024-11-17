import { useEffect, useState } from "react";

import "./CurriculumVitae.css";
import { useScaledContentWidth } from "app/routes/Home/hooks/useScaledContentWidth";

export function CurriculumVitae() {
  const [scale, setScale] = useState(1);
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    fetch("/assets/cv-redacted.html")
      .then((response) => response.text())
      .then((data) => {
        setHtmlContent(data);
      })
      .catch((error) => {
        console.error("Error fetching HTML content:", error);
      });
  }, []);

  const { containerRef, contentRef } = useScaledContentWidth(setScale)

  useEffect(() => {
    if (contentRef.current && containerRef.current) {
      contentRef.current.style.transform = `scale(${scale})`;
      containerRef.current.style.height = `${scale * 1870}px`;
    }
  }, [scale, contentRef, containerRef]);

  return <div className="cv-layout overflow-scroll">
    <div ref={containerRef} className="cv-container" >
      <div ref={contentRef} className="cv bg-white shadow" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  </div>;

}