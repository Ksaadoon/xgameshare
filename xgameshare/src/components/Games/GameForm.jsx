import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Alert } from 'react-bootstrap';
import * as xgameshareService from './../../services/xgameshare/xgameshare-service';
import "./Game.css";

/**
 * 
 * The onClose prop in the Alert component with the onClose={() => setSaved(false)} callback is used 
 * to handle the case when the user closes/dismisses the Alert component manually by clicking the close button.
 *
 */
const GameForm = ({ game }) => {

    const [alert, setAlert] = useState(false);
    const [saved, setSaved] = useState(false);
    const [variant, setVariant] = useState(false);
    const [alertMessage, setAlertMessage] = useState("Added to your favorites!");


    const handleClick = async () => {
        try {
            const res = await xgameshareService.saveFavorite({ game });
            if (res.status === 409) {
                setAlertMessage("Already part of your favorites");
            }
            setVariant("success");
            setSaved(true);
            setAlert(true);

        } catch (error) {
            if (error.message === 'Conflict') {
                setAlertMessage("Already part of your favorites");
                setVariant("warning");
                setSaved(true);
                setAlert(true);
            }


        } finally {
            setTimeout(() => {
                setAlert(false);
            }, 2000); // Hide after 2 seconds
        }
    };



            return (
            <div >
                {alert && (
                    <Alert variant={variant} onClose={() => setAlert(false)} dismissible>
                        {alertMessage}
                    </Alert>
                )}

                {!saved && (
                    <Button variant="primary" type="submit" onClick={handleClick}>
                        Add
                    </Button>
                )}
            </div>
            );

};


/**
 * Definition of the prop being passed on line 9: This prop is a object.
 * This prop contains all the games json data returns by the IGDB API.
 */
GameForm.propTypes = {
    game: PropTypes.object,
};

export default GameForm