import React from 'react';
import Section1 from '../Section1/Section1';
import Section2 from '../Section2/Section2';
import './LandingPage.css'

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Section1 />
      <div className="section-23-background" style={{backgroundImage: `url(${process.env.PUBLIC_URL + "/part-field.png"})`}}>
      <Section2 />
      <div className=""><h1 className="name">Parth Singhal</h1></div>
      </div>
    </div>
  )
}

export default LandingPage
