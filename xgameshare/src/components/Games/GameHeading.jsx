import PropTypes from 'prop-types';

const GameHeading = ({ selectedGenre, selectedPlatform} ) => {

  
  const platformName = selectedPlatform?.name || '';
  const genreName = selectedGenre?.name || '';
  const heading = `${platformName} ${genreName} Games`;

  return (
    <h1>{heading}</h1>
  )
}

GameHeading.propTypes = {
    selectedGenre: PropTypes.object,
    selectedPlatform: PropTypes.object,
  };
  
export default GameHeading