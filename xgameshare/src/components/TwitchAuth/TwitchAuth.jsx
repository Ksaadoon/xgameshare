import React, { useCallback, useState, useEffect } from 'react';

/**********************************************************************************
 * This component is obsolete as the authentication is now managed in the backend.
 * Keeping it for historic purposes.
 * 
 ********************************************************************************/

/**
 * The twitch API call for authentication returns:
        {
            "access_token": "j2fr55iqoz74qg5zwa0bc15o3m1jot",
            "expires_in": 5412302,
            "token_type": "bearer"
        }
 */

const TwitchAuth = ({ setIsAuthenticated, isAuthenticated, setAccessToken, accessToken, setExpiresIn, expiresIn }) => {
    const [twitchAuthUrl, setTwitchAuthUrl] = useState(null);
    const [twitchClientId, setTwitchClientId] = useState(null);
    const [twitchClientSecret, setTwitchClientSecret] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    /** 
     The useEffect are called in order that they are declared.
     So we need the /env first to be able execute authenticate.
     it will returns for instance:
     {
        "TWITCH_AUTH_URL": "https://id.twitch.tv/oauth2/token",
        "TWITCH_CLIENT_ID": "3vei7tcaokpacpb2m5a94lgkqdz0bu",
        "TWITCH_CLIENT_SECRET": "jf1ssgf8t6rl0lxfauouvvdphu40tk"
        }
    */
    useEffect(() => {
        console.log("calling useEffect 1");
        const fetchEnvVariables = async () => {
            try {
                const response = await fetch('/env');
                const { TWITCH_AUTH_URL, TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = await response.json();
                setTwitchAuthUrl(TWITCH_AUTH_URL);
                setTwitchClientId(TWITCH_CLIENT_ID);
                setTwitchClientSecret(TWITCH_CLIENT_SECRET);
                setIsLoading(false);

            } catch (error) {
                console.error('Error fetching environment variables:', error);
            }
        };

        fetchEnvVariables();
    }, []);

    const authHelper = useCallback(async () => {
        console.log("calling authHelper");
        //Important here await first
        const response = await fetch(twitchAuthUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: twitchClientId,
                client_secret: twitchClientSecret,
                grant_type: 'client_credentials',
            }),
        });
        //!!!!!!!Important here to await for json formatting!!!!!!!!
        return await response.json();
    }, [twitchAuthUrl, twitchClientId, twitchClientSecret]);

    useEffect(() => {
        console.log("calling useEffect 2");
        const authenticate = async () => {
            try {
                const { access_token, expires_in } = await authHelper();
                console.log("token: " + access_token + " exp:" + expires_in);
                setAccessToken(access_token);
                setExpiresIn(expires_in);
                setIsAuthenticated(true);

            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
            }
        };

        if (!isLoading && !isAuthenticated && twitchAuthUrl && twitchClientId && twitchClientSecret) {
            authenticate();
        }

    }, [isLoading, isAuthenticated, setIsAuthenticated, setAccessToken, setExpiresIn, authHelper, twitchAuthUrl, twitchClientId, twitchClientSecret]);


    // /**
    //  * When the application-level access TWITCH token is about to  expire, 
    //  * Detect it by checking the expiration time included in the token response.
    //  */
    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         const refreshToken = async () => {
    //             try {
    //                 const { access_token, expires_in } = await authHelper();
    //                 setAccessToken(access_token);
    //                 setExpiresIn(expires_in);

    //             } catch (error) {
    //                 setIsAuthenticated(false);
    //                 console.log(error);                    
    //             }
    //         };
    //         if (expiresIn > 60) {
    //             // Refresh the token 60 seconds before expiration
    //             refreshToken();
    //         }
    //     }, (expiresIn - 60) * 1000);

    //     return () => {
    //         clearInterval(timer);
    //     };
    // }, [authHelper, setIsAuthenticated,setExpiresIn, setAccessToken, expiresIn]);

    return (
        <div>
            {/* {accessToken ? (
                <div>
                    <p>Access Token: {accessToken}</p>
                    <p>Expires In: {expiresIn}</p>
                </div>
            ) : (
                <div>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <div>
                            <p>Authenticating...</p>
                            <p>twitch auth url: {twitchAuthUrl}</p>
                        </div>
                    )}
                </div>
            )} */}
           
        </div>
    );

    // //FOR TEST : displaying 
    // return (
    //     <div>
    //         <h2>Environment Variables</h2>
    //         <ul>
    //             <li>twitch auth url: {envVariables.TWITCH_AUTH_URL}</li>
    //             <li>twitch client id: {envVariables.TWITCH_CLIENT_ID}</li>
    //             <li>twitch client secret: {envVariables.TWITCH_CLIENT_SECRET}</li>
    //             {/* Display additional variables as needed */}
    //         </ul>
    //     </div>
    // );

};

export default TwitchAuth;
