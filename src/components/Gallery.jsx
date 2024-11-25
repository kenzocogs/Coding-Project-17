import React, { useState, useEffect } from 'react';

function Gallery () {
    const [tours, setTours] = useState([])
    const [loading, setLoading] = useState([true])
    const [error, setError] = useState([null])

    useEffect(() => {
        // fetching tour api data
        fetch('https://www.course-api.com/react-tours-project')
            .then((response) => {
                if (!response.ok) {
                    throw new Error ('Network response was not okay');
                }
                return response.json(); // return response
            })
            .then(data => {
                setTours(data);
                setLoading(false);
            })
            // using.catch to detect errors
            .catch (error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);
        // setting up the "not interested" button
        const removeTour = (id) => {
            setTours(tour.filter(tour => tour.id !== id)); // filtering out the tour w/ the specific id
        };

        // rendering loading and error states
        if (loading) {
            return <div><h3>Loading tours...</h3></div>
        }

        if (error) {
            return <div><h3>Error: {error.message} </h3></div>
        }
   
        
        // setting up gallery/tour outputs using .map (with buttons to show/hide description and remove a tour)
        return (
            <div className ="gallery-div">
                <h2>Tours:</h2>
                {tours.map((tour) => (
                    <div className ='tour-card' key={tour.id}> 
                    <img src={tour.image} />
                    <h3 className='tour-title'><em>{tour.name}</em></h3>
                    <p>${tour.price}</p>
                    <button onClick={() => removeTour(tour.id)}>Not Interested</button>
                    </div>
                ))}
            </div>
        )
    };

// exporting for app.jsx
    export default Gallery;