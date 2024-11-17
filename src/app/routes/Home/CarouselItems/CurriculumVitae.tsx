import React, { useEffect, useState } from 'react';

import './CurriculumVitae.css';
import { ReactComponent as CVGem } from 'icons/cv_gem.svg';
import { useScaledContentWidth } from 'app/routes/Home/hooks/useScaledContentWidth';

export function CurriculumVitae() {
  const [scale, setScale] = useState(1);
  const { containerRef, contentRef } = useScaledContentWidth(setScale);

  useEffect(() => {
    if (contentRef.current && scale)
      contentRef.current.style.transform = `scale(${scale})`;
  }, [scale, contentRef]);

  return <div ref={containerRef} className='curriculum-vitae'>
    <div ref={contentRef} className='scaled-content'>
      <iframe src='/assets/cv-redacted.html' sandbox='allow-top-navigation-by-user-activation' />
    </div>
    <a href='/curriculum-vitae'>
      <CVGem className='link' />
    </a>
  </div>;
};


