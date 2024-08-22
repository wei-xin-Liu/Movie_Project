import React, { useEffect } from 'react'

function Bluepaysuccess() {
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get('https://a531-123-205-23-185.ngrok-free.app/Movie_Project/movie/public/api/bluepaysuccessful');
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        fetchdata();
    }, []);

    return (
        <div>Bluepaysuccess</div>
    )
}

export default Bluepaysuccess