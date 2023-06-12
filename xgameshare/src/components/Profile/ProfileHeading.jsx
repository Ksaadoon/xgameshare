import PropTypes from 'prop-types';

const ProfileHeading = ({ selectedMenu} ) => {

  const heading = `${selectedMenu}`;

  return (
    <h1>{heading}</h1>
  )
}

ProfileHeading.propTypes = {
    selectedOption: PropTypes.string,

  };
  
export default ProfileHeading