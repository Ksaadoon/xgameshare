import React, { useState, useEffect } from 'react';

const TwitchAuth = () => {
    const [envVariables, setEnvVariables] = useState({});
    const [accessToken, setAccessToken] = useState('');
    const [expiresIn, setExpiresIn] = useState(0);

    useEffect(() => {
        fetch('/env')
          .then((response) => response.json())
          .then((data) => setEnvVariables(data))
          .catch((error) => console.error('Error fetching environment variables:', error));
      }, []);
    

    useEffect(() => {
        authenticate();
    }, []);

    const authenticate = async () => {
        try {
            const clientID = process.env.;
            const clientSecret = 'YOUR_CLIENT_SECRET';

            const response = await fetch('https://id.twitch.tv/oauth2/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    client_id: clientID,
                    client_secret: clientSecret,
                    grant_type: 'client_credentials'
                })
            });

            const { access_token } = await response.json();
            setAccessToken(access_token);
        } catch (error) {
            console.error('Authentication error:', error);
        }
    };

    return (
        <div>
            {accessToken ? (
                <p>Access Token: {accessToken}</p>
            ) : (
                <p>Authenticating...</p>
            )}
            {/* Use the access token in your API requests */}
        </div>
    );
};

export default TwitchAuth;
