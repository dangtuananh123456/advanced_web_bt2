import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import "../styles.css"
import axios from 'axios';

const PhotoDetail = () => {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const response = await axios.get(`https://api.unsplash.com/photos/${id}?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`);
                setPhoto(response.data);
            } catch (error) {
                console.error("Error fetching photo details:", error);
            }
        };
        fetchPhoto();
    }, [id]);

    if (!photo) return <p>Loading...</p>;

    return (
        <div className="photo-detail">
            <img src={photo.urls.full} alt={photo.alt_description} />
            <h2>{photo.alt_description || "Untitled"}</h2>
            <p>By: {photo.user.name}</p>
            <p>{photo.description || "No description available."}</p>
        </div>
    );
};

export default PhotoDetail;
