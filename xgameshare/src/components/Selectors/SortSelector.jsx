import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';

const SortSelector = ({onSortOrder}) => {


    const sortOrders = [
        { value: '', label: 'Relevance' },
        { value: 'created_at', label: 'Date added' },
        { value: 'name', label: 'Name' },
        { value: 'first_release_date', label: 'Release date' },
        { value: 'aggregated_rating', label: 'Average rating' },
    ]

    return (


        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-toggle">
                Order by: Relevance
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {sortOrders.map((order) => (<Dropdown.Item key={order.value} value={order.value} >{order.label}</Dropdown.Item>))};
            </Dropdown.Menu>
        </Dropdown>


    )
}

//when a sort is selected, the homepage will be notified with this function (func)
//This is a prop function!
SortSelector.propTypes = {
    onSortOrder: PropTypes.func,
};


export default SortSelector