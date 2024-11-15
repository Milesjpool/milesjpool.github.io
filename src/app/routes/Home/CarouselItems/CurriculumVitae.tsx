import React, { useEffect, useRef, useState } from 'react';

import './CurriculumVitae.css';
import { ReactComponent as CVGem } from 'icons/cv_gem.svg';

export function CurriculumVitae() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLIFrameElement>(null);

  const scaleIframe = () => {
    if (containerRef.current && contentRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const iframeWidth = contentRef.current.offsetWidth;
      const scale = containerWidth / iframeWidth;
      contentRef.current.style.transform = `scale(${scale})`;
    }
  };

  useEffect(() => {
    scaleIframe();
    window.addEventListener('resize', scaleIframe);
    return () => window.removeEventListener('resize', scaleIframe);
  }, []);

  return <div ref={containerRef} className='curriculum-vitae'>
    <div ref={contentRef} className='scaled-content'>
      <iframe src='/assets/cv-redacted.html' sandbox='allow-top-navigation-by-user-activation' />
    </div>
    <a href='/curriculum-vitae'>
      <CVGem className='link' />
    </a>
  </div>;
};