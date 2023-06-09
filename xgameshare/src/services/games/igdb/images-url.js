import backupImage from '../../../assets/background.jpg'

const getCroppedImageUrl = (imageUrl) => {
    if (!imageUrl) return backupImage;

    const lastSlashIndex = imageUrl.lastIndexOf('/');
    const secondLastSlashIndex = imageUrl.lastIndexOf('/', lastSlashIndex - 1);
    
    let temp = imageUrl.substring(0, secondLastSlashIndex + 1) + 't_cover_small_2x' + imageUrl.substring(lastSlashIndex);
    //console.log("temp: = " + temp);
    //let newUrl = process.env.REACT_APP_IGDB_BASE_URL_IMAGE + temp; 
    //console.log("new: = " + newUrl);

    return temp;
}
export default getCroppedImageUrl;