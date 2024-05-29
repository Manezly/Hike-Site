import { getDisplayName } from 'next/dist/shared/lib/utils';
import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader';

const override = {
    display: 'block',
    margin: '10rem auto'
}

const LoadingPage = ({ loading }) => {
  return (
    <ClipLoader
        color='#f1f5f9'
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label='Loading Spinner'
    />
  )
}

export default LoadingPage