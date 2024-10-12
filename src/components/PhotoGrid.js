import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PhotoGrid = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loadMoreRef = useRef(null); // Reference for the loading element

  useEffect(() => {
    fetchPhotos();
  }, [page]);

  const fetchPhotos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.unsplash.com/photos?page=${page}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`);
      setPhotos(prevPhotos => [...prevPhotos, ...response.data]);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
    setLoading(false);
  };

  // Using Intersection Observer to load more photos
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading) {
        setPage(prevPage => prevPage + 1);
      }
    });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loading]);

  return (
    <div className="photo-grid">
      {photos.map((photo, index) => (
        <Link to={`/photos/${photo.id}`} key={index}>
          <img src={photo.urls.thumb} alt={photo.alt_description} />
          <p>{photo.user.name}</p>
        </Link>
      ))}
      {loading && <p>Loading...</p>}
      <div ref={loadMoreRef} style={{ height: '20px', marginBottom: '20px' }}></div> {/* Loading trigger */}
    </div>
  );
};

export default PhotoGrid;
