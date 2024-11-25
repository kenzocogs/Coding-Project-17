import React, { useState, useEffect } from 'react';

const Gallery = () => {
    // defining state management for tours, as well as the loading and error states
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // NOTE: the first iteration of this section of code was completely non-functional;
        // redoing it to fix functionality

        const fetchTours = async () => {
            // fetching from api
            try {
                const response = await fetch ("https://api.allorigins.win/get?url=https://course-api.com/react-tours-project"); // changing original api link to bypass CORS error 
            // checking network response
            if (!response.ok) {
                throw new Error ('Network response was not okay');
            }
            // getting response in JSON 
            const data = await response.json();
            const tourData = JSON.parse(data.contents);

            // setting data and removing loading status
            setTours(tourData);
            setLoading(false);

            // catching for errors
            } catch (err) {
                setError(err.message)
                setLoading(false)
            }
        };

        fetchTours();
    }, []);

    // setting up the "not interested" button
    const removeTour = (id) => {
        setTours((oldTours) => oldTours.filter((tour) => tour.id !== id)); // filtering out the tour w/ the specific id
    };

    // rendering loading and error states
    if (loading) {
        return <div><h3>Loading tours...</h3></div>
    }

    if (error) {
        return <div><h3>ERROR: {error} </h3></div>
    }

 // setting up the format for the gallery/tour outputs (with buttons to show/hide description and remove a tour)
    const TourCard = ({ tour, removeTour }) => {
        const [showMore, setShowMore] = useState(false); 
        return (
          <div className="tour-card">
            <img className="tour-image" src= {tour.image}/>
            <h2>{tour.name} - <u>${tour.price}</u></h2>
            <p className="tour-description">
              {showMore ? tour.info : `${tour.info.substring(0, 100)}...`} 
              <button className="read-more" onClick={() => setShowMore((prev) => !prev)}> {showMore ? "Show Less" : "Read More"} </button>   
            </p>
            <button className="remove-tour" onClick={() => removeTour(tour.id)}> Not Interested </button>
          </div>
        );
      };
  
    // Using .map to create a new array based on the TourCard format 
    return (
        <div className="gallery-div">
            <h2><em>Recommended Tours For You:</em></h2>
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} removeTour={removeTour} /> 
          ))}
        </div>
      );
    };
    
// exporting for App.jsx
export default Gallery;