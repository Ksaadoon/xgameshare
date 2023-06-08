import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import usePlatforms from '../../hooks/usePlatforms';

const PlatformSelector = () => {

    const { data: platforms, error, loading } = usePlatforms();

    //not rendering the component if there is an error
    if(error) return null;

    return (

        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-toggle">
                Platform
            </Dropdown.Toggle>
            <Dropdown.Menu>               
                { platforms.map(platform => <Dropdown.Item key={platform.id}>{platform.name}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>

    )
}

export default PlatformSelector