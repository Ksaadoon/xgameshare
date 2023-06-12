
import React from 'react'
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import PropTypes from 'prop-types';

const ProfileMenu = ({setSelectedMenu, selectedMenu}) => {

    const menus = ["Account", "Favorites", "Friends"]; 
 
    return (
        <ListGroup>
            {menus.map(menu => (

                <ListGroupItem  key={menu} onClick={() => setSelectedMenu(menu)}  className={menu === selectedMenu ? 'active' : ''}>
                    {menu}
                </ListGroupItem>

            ))}
        </ListGroup>
    )


}

ProfileMenu.propTypes = {
    setSelectedMenu: PropTypes.func.isRequired,
    selectedMenu: PropTypes.string,
};

export default ProfileMenu