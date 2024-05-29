import React from 'react'
import '@/assets/styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';
import Head from 'next/head';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'photoswipe/dist/photoswipe.css';

export const metadata = {
    title: 'Hikes',
    description: 'Hiking website',
    keywords: 'hiking',
};

const MainLayout = ({ children }) => {
  return (
    <AuthProvider>
      <html lang='en'>
          <Head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <meta name="keywords" content={metadata.keywords} />
            <link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap" rel="stylesheet"/>
          </Head>
          <body>
              <Navbar />
              <main>{children}</main>
              <ToastContainer />
              <Footer />
          </body>
      </html>
    </AuthProvider>
  )
}

export default MainLayout