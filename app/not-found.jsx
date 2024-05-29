import React from 'react'
import Link from 'next/link'

const NotFound = () => {
  return (
    // CC styling is in global.css file
    <section className='section container not_found'>
        <h2>Page Not Found</h2>
        <Link 
            href='/'
            className='btn'
        > Home </Link>
    </section>
  )
}

export default NotFound