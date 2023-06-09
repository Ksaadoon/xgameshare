import { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';


const SearchComponent = ({onSearch, clearSearchText}) => {
    
    /*
        To get access to the input field in Form.Control.
        2 ways:
            - state
            - ref hook
        For a simple form, it is easier to use a ref hook.
    */
    const ref = useRef();

    async function handleSubmit(evt) {
        // Prevent form from being submitted to the server
        evt.preventDefault();
        // when the form is submitted check the ref has something
        if(ref.current  && ref.current.value) {
            console.log(ref.current.value);
            onSearch(ref.current.value);       
                        
        }
    }

    return (
        <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
                type="search"
                placeholder="Search games..."
                className="me-2"
                aria-label="Search"
                ref={ref}               
            />
            <Button variant="outline-success" type="submit" >Search</Button>
        </Form>
    )
}

/*
If the NavBar component holds the SearchComponent, and the HomePage component holds the Games component, 
you can directly pass the necessary prop function from the SearchComponent to the Games component
through the HomePage component. No need to go through the NavBarComponent.

 when a search is triggerd, the HomePage component will be notified with this function (func)
 This is a prop function!
*/
SearchComponent.propTypes = {
    onSearch: PropTypes.func,
    clearSearchText: PropTypes.func,
};

export default SearchComponent