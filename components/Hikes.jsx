'use client';
import { useState, useEffect } from "react";
import HikeCard from "./HikeCard";
import Pagination from "./Pagination";

const Hikes = () => {
  const [hikes, setHikes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(2); // Adjust page size as needed
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchHikes = async () => {
      try {
        const res = await fetch(`/api/hikes?page=${page}&pageSize=${pageSize}`);

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();
        // console.log('Fetched Hikes Data:', data);
        setHikes(data.hikes);
        setTotalItems(data.total);
      } catch (error) {
        console.error('Error fetching hikes:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchHikes();
  }, [page, pageSize]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return loading ? (
    'Loading...'
  ) : (
    <>
    <div className="hikes">
      {hikes.length === 0 ? (
        <p>Hikes not found</p>
      ) : (
        hikes.map((hike) => (
          <HikeCard key={hike._id} hike={hike} />
        ))
      )}
      
    </div>
    <Pagination 
    page={page} 
    pageSize={pageSize} 
    totalItems={totalItems} 
    onPageChange={handlePageChange}
  />
  </>
  );
}

export default Hikes;
