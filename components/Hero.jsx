import React from 'react'
import '../assets/styles/hero.css';
import HikeSearchForm from './HikeSearchForm';

const Hero = () => {
  return (
    <section className="container section hero">
        <h1>This is test hiking app/site</h1>
        <h2>In Nextjs</h2>
        <HikeSearchForm></HikeSearchForm>
    </section>
  )
}

export default Hero