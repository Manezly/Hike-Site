import React from 'react'
import Link from 'next/link';
import Hero from '@/components/Hero';
import HomeHikeCards from '@/components/HomeHikeCards';
import Footer from '@/components/Footer';

const HomePage = () => {
  return (
    <main>
      <Hero />
      <HomeHikeCards />
    </main>
  )
}

export default HomePage