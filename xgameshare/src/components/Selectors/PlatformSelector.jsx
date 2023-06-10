import usePlatformsFamilies from '../../hooks/usePlatformsFamilies';
import PropTypes from 'prop-types';
import { Dropdown, Spinner } from 'react-bootstrap';

/*
    The platform selector should notify the HomePage component.
    The HomePage component is holding a state variable named selectedPlatform keeping track of the platform selection.
    The selectedPlatform state variable will be used to be passed on to the Games component for filtering
    Games based on the platform.
    
    onSelectPlatform is a prop function!
*/
const PlatformSelector = ({ onSelectPlatform, selectedPlatform }) => {

    const { platforms, loading } = usePlatformsFamilies();

    if (loading) return <Spinner />;

    return (

        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-toggle">
                {selectedPlatform?.name || 'Platforms' }
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {/* () => onSelectPlatform(platform): 
                    this is a function calling the prop function onSelectedPlatform.
                    click on a platform from the dropdown, it will notifies the HomePage component.
                It is a prop function!
              */}              
                {platforms.map(platform => 
                    <Dropdown.Item onClick={() => onSelectPlatform(platform)} key={platform.id}>
                        {platform.name}
                    </Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>

    )
}


//when a platform is selected, the homepage will be notified with this function (func)
//This is a prop function!
PlatformSelector.propTypes = {
    onSelectPlatform: PropTypes.func,
    selectedPlatform: PropTypes.object,
};

export default PlatformSelector