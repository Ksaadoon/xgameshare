import Dropdown from 'react-bootstrap/Dropdown';
import PropTypes from 'prop-types';

const SortSelector = ({onSortOrder, sortOrder}) => {


    const sortOrders = [
        { value: '', label: 'Relevance' },
        { value: 'created_at', label: 'Date added' },
        { value: 'name', label: 'Name' },
        { value: 'first_release_date', label: 'Release date' },
        { value: 'aggregated_rating', label: 'Average rating' },
    ]
    const currentSortOrder = sortOrders.find(order => order.value === sortOrder);

    return (


        <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown-toggle">
                Order by: {currentSortOrder?.label || 'Relevance'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {sortOrders.map((order) => (
                    <Dropdown.Item onClick={() => onSortOrder(order.value)} key={order.value} value={order.value}>
                        {order.label}
                    </Dropdown.Item>
                ))};
            </Dropdown.Menu>
        </Dropdown>


    )
}

//when a sort is selected, the homepage will be notified with this function (func)
//This is a prop function!
SortSelector.propTypes = {
    onSortOrder: PropTypes.func,
    selectedPlatform: PropTypes.string,
};


export default SortSelector