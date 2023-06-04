import React, { useState, useEffect } from 'react';

const TwitchAuth = () => {
    const [envVariables, setEnvVariables] = useState({});


    useEffect(() => {
        fetch('/env')
            .then((response) => response.json())
            .then((data) => setEnvVariables(data))
            .catch((error) => console.error('Error fetching environment variables:', error));
    }, []);



    //FOR TEST : displaying 
    return (
        <div>
            <h2>Environment Variables</h2>
            <ul>
                <li>twitch auth url: {envVariables.TWITCH_AUTH_URL}</li>
                <li>twitch client id: {envVariables.TWITCH_CLIENT_ID}</li>
                <li>twitch client secret: {envVariables.TWITCH_CLIENT_SECRET}</li>
                {/* Display additional variables as needed */}
            </ul>
        </div>
    );
};

export default TwitchAuth;
