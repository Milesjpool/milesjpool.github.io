import { useState } from 'react';
import "./App.css"

function Footer() {
  const [showDomain, setShowDomain] = useState(false) 

  return (
    <footer 
      className="app-footer"
      onMouseEnter={() => setShowDomain(true)} 
      onMouseLeave={() => setShowDomain(false)}
      >
      <span className='text-3xl font-bold underline'>
        👾 Miles
      </span>
      {showDomain && <span>
        JPool.com
      </span>}
    </footer>
  );
}


function Content() {
  return (
    <div className='content'>
      <div/>
      <div/>
    </div>
  );
}
export function App() {
  return (
    <div className="app">
        <Content/>
        <Footer/>
    </div>
  );
}
