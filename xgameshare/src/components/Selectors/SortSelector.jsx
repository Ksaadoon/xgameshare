import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';


const SortSelector = () => {
    return (


        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-toggle">
                Order by: Relevance
            </Dropdown.Toggle>
            <Dropdown.Menu>       
                    <Dropdown.Item>Relevance</Dropdown.Item>
                    <Dropdown.Item>Date added</Dropdown.Item>
                    <Dropdown.Item>Name</Dropdown.Item>
                    <Dropdown.Item>Relevance</Dropdown.Item>

            </Dropdown.Menu>
        </Dropdown>


    )
}

export default SortSelector