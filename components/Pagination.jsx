import React from 'react'

const Pagination = ({page, pageSize, totalItems, onPageChange}) => {
    const totalPages = Math.ceil(totalItems / pageSize);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    }

  return (
    <section className='pagination'>
        <button 
            className='btn'
            disabled={page === 1}
            onClick={() => handlePageChange(page - 1)}
            >Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button 
            className='btn'
            disabled={page === totalPages}
            onClick={() => handlePageChange(page + 1)}
            >Next</button>
    </section>
  )
}

export default Pagination